import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet-async';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_stripe);

const Payment = () => {

    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>Payment | TeachFlow</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                {/* <h1 className='my-10 text-center font-semibold text-xl'>For Testing Purpose We Are Using Stripe! We'll Change It ASAP!</h1> */}
                <PaymentForm />
            </Elements>
        </div>
    );
};

export default Payment;