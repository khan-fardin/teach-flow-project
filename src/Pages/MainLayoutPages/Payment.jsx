import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51RgVjoRpShJTiz6ec6UuNZf2Tzk55PNHdtG3KB91cT8i4oj3Dz7s9CRNaZ2KqXwz3199dzvnvAqeSYDzbDvYwl0800TM7gWRUV');

const Payment = () => {

    return (
        <div className='min-h-screen'>
            <Elements stripe={stripePromise}>
                <h1 className='my-10 text-center font-semibold text-xl'>For Testing Purpose We Are Using Stripe! We'll Change It ASAP!</h1>
                <PaymentForm />
            </Elements>
        </div>
    );
};

export default Payment;