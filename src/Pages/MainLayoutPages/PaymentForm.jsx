import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentForm = () => {

    const { user } = useAuth();
    const { id, classId } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: parcelInfo = {}, isPending } = useQuery({
        queryKey: ['classes', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${id}`);
            return res.data;
        }
    });

    if (isPending) { return '.........Loading' };

    const payableAmount = parcelInfo.price;
    const payableAmountInCents = payableAmount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        };
        const card = elements.getElement(CardElement);
        if (!card) { return; };
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            // console.log('[error]', error);
            setErrorMsg(error.message);
        } else {
            setErrorMsg('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        // create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amount: payableAmountInCents,
            classId
        })

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                },
            },
        });

        if (result.error) {
            console.log(result.error.message)
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                // creating payment history
                const paymentData = {
                    classId,
                    email: user.email,
                    amount: payableAmount,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    paidAt: new Date(),
                    paidAtString: new Date().toISOString(),
                };
                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if (paymentRes.data.insertedId) {
                    toast.success('Payment Succeeded! Transaction Id:', result.paymentIntent.id)
                }
            }
        };
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-2xl max-w-md mx-auto'>
                <CardElement />
                <button className='btn bg-[#CAEB66] w-full' type='submit' disabled={!stripe}>Pay ৳{payableAmount} (suppose taka was payable by stripe)</button>
                {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;