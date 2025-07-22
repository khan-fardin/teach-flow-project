import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loading';

const PaymentForm = () => {
    const { user } = useAuth();
    const { classId } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');

    // ✅ Fetch class info
    const { data: classInfo = {}, isPending } = useQuery({
        queryKey: ['class-by-classId', classId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/by-classId/${classId}`);
            return res.data;
        }
    });

    // ✅ Mutation for creating payment intent
    const createPaymentIntent = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.post('/create-payment-intent', {
                amount: payableAmount * 100, // cents
                classId,
            });
            return res.data.clientSecret;
        },
    });

    // ✅ Mutation for submitting payment data to backend
    const savePayment = useMutation({
        mutationFn: async (paymentData) => {
            const res = await axiosSecure.post('/payments', paymentData);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.enrollmentId) {
                toast.success(`✅ Payment Successful! Enrolled. Txn ID: ${data.transactionId}`);
                navigate(`/dashboard/myenroll-class/${data.enrollmentId}`);
            } else {
                toast.error('⚠ Payment saved but enrollment failed.');
            }
        },
        onError: () => {
            toast.error('❌ Failed to save payment.');
        }
    });

    if (isPending) return <Loading />;

    const payableAmount = parseFloat(classInfo?.price || 0);
    if (!payableAmount) return <p>Invalid class price.</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (methodError) {
            setErrorMsg(methodError.message);
            return;
        } else {
            setErrorMsg('');
        }

        try {
            const clientSecret = await createPaymentIntent.mutateAsync();

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email,
                    },
                },
            });

            if (confirmError) {
                toast.error(confirmError.message);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                const paymentData = {
                    classId,
                    email: user.email,
                    amount: payableAmount,
                    transactionId: paymentIntent.id,
                    paymentMethod: paymentIntent.payment_method_types,
                    paidAt: new Date(),
                    paidAtString: new Date().toISOString(),
                    userName: user.displayName,
                };

                // ✅ Submit payment info
                await savePayment.mutateAsync(paymentData);
            }
        } catch (err) {
            console.error('❌ Payment error:', err);
            toast.error('Something went wrong.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-2xl max-w-md mx-auto'>
                <CardElement />
                <button
                    className='btn bg-[#CAEB66] w-full'
                    type='submit'
                    disabled={!stripe || createPaymentIntent.isPending || savePayment.isPending}
                >
                    Pay ৳{payableAmount}
                </button>
                {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
