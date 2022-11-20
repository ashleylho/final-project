import React, { useState, useRef, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import InjectedCheckoutForm from '../components/checkout-form';

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const stripePromiseRef = useRef(loadStripe(process.env.STRIPE_PUBLIC_KEY));

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
      }
      )
      .catch(err => console.error(err));
  }, []);

  const appearance = {
    theme: 'stripe'
  };
  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="checkout-page">
      {clientSecret && (
        <Elements options={options} stripe={stripePromiseRef.current}>
          <InjectedCheckoutForm/>
        </Elements>
      )}
    </div>
  );
}
