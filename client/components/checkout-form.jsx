import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OrderSummary from '../components/order-summary';
import Button from 'react-bootstrap/Button';
// import {
//   PaymentElement,
//   useStripe,
//   useElements
// } from '@stripe/react-stripe-js';
import { ElementsConsumer, PaymentElement } from '@stripe/react-stripe-js';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: 'contactInfo',
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      address2: null,
      city: '',
      state: '',
      zip: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.payment = this.payment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  payment() {
    this.setState({ checkout: 'payment' });
  }

  nextButton() {
    if (this.state.checkout === 'contactInfo') {
      return <Button type="button" onClick={this.payment}>Continue to Payment</Button>;
    }
    return null;
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/'
      }
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      console.log('hi');
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  render() {
    return (
      <>
        <h5>Personal Information</h5>
        <Form onSubmit={this.handleSubmit}>
          <ContactInfo
            handleChange={this.handleChange}
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            address={this.state.address}
            address2={this.state.address2}
            city={this.state.city}
            state={this.state.state}
            zip={this.state.zip}
            checkout={this.state.checkout}
         />
          {this.nextButton()}
          <CheckoutForm checkout={this.state.checkout}/>
        </Form>
      </>
    );
  }
}

class CheckoutForm extends React.Component {
  // handleSubmit = async event => {
  //   // We don't want to let default form submission happen here,
  //   // which would refresh the page.
  //   event.preventDefault();

  //   const { stripe, elements } = this.props;

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   const result = await stripe.confirmPayment({
  //     // `Elements` instance that was used to create the Payment Element
  //     elements,
  //     confirmParams: {
  //       return_url: 'localhost:3000'
  //     }
  //   });

  //   if (result.error) {
  //     // Show error to your customer (for example, payment details incomplete)
  //     console.log(result.error.message);
  //   } else {
  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //   }
  // };

  render() {
    if (this.props.checkout !== 'payment') {
      return null;
    }
    return (
    // <form onSubmit={this.handleSubmit}>
      <>
        <PaymentElement />
        <button>Submit and give me yo money</button>
      </>
    // </form>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <Checkout stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       'payment_intent_client_secret'
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case 'succeeded':
//           setMessage('Payment succeeded!');
//           break;
//         case 'processing':
//           setMessage('Your payment is processing.');
//           break;
//         case 'requires_payment_method':
//           setMessage('Your payment was not successful, please try again.');
//           break;
//         default:
//           setMessage('Something went wrong.');
//           break;
//       }
//     });
//   }, [stripe]);

//   // const handleSubmit = async e => {
//   //   e.preventDefault();

//   //   if (!stripe || !elements) {
//   //     // Stripe.js has not yet loaded.
//   //     // Make sure to disable form submission until Stripe.js has loaded.
//   //     return;
//   //   }

//   //   setIsLoading(true);

//   //   const { error } = await stripe.confirmPayment({
//   //     elements,
//   //     confirmParams: {
//   //       // Make sure to change this to your payment completion page
//   //       return_url: 'http://localhost:3000'
//   //     }
//   //   });

//   //   // This point will only be reached if there is an immediate error when
//   //   // confirming the payment. Otherwise, your customer will be redirected to
//   //   // your `return_url`. For some payment methods like iDEAL, your customer will
//   //   // be redirected to an intermediate site first to authorize the payment, then
//   //   // redirected to the `return_url`.
//   //   if (error.type === 'card_error' || error.type === 'validation_error') {
//   //     setMessage(error.message);
//   //   } else {
//   //     setMessage('An unexpected error occurred.');
//   //   }

//   //   setIsLoading(false);
//   // };

//   return (
//     <Form id="payment-form" onSubmit={handleSubmit}>
//       <PaymentElement id="payment-element" />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner" /> : 'Pay now'}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </Form>
//   );
// }

class ContactInfo extends React.Component {
  render() {
    if (this.props.checkout !== 'contactInfo') {
      return null;
    }
    return (
      <div className="mx-3 border px-3 py-2 rounded mb-4">
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={this.props.email}
            required
            onChange={this.props.handleChange}/>
        </Form.Group>
        <Row>
          <Form.Group as={Col} xs="6">
            <Form.Label className="mt-2">First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={this.props.firstName}
              required
              onChange={this.props.handleChange}/>
          </Form.Group>
          <Form.Group as={Col} xs="6">
            <Form.Label className="mt-2">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={this.props.lastName}
              required
              onChange={this.props.handleChange}/>
          </Form.Group>
        </Row>
        <Form.Group>
          <Form.Label className="mt-2">Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={this.props.address}
            required onChange={this.props.handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-2">Address 2</Form.Label>
          <Form.Control
            type="text"
            name="address2"
            value={this.props.address2}
            onChange={this.props.handleChange}/>
        </Form.Group>
        <Row>
          <Form.Group as={Col} xs="5">
            <Form.Label className="mt-2">City</Form.Label>
            <Form.Control
              type="text"
              required
              name="city"
              value={this.props.city}
              onChange={this.props.handleChange}/>
          </Form.Group>
          <Form.Group as={Col} xs="3">
            <Form.Label className="mt-2">State</Form.Label>
            <Form.Control
              type="text"
              required
              name="state"
              value={this.props.state}
              onChange={this.props.handleChange}/>
          </Form.Group>
          <Form.Group as={Col} xs="4">
            <Form.Label className="mt-2">Zip</Form.Label>
            <Form.Control
              type="text"
              required
              name="zip"
              value={this.props.zip}
              onChange={this.props.handleChange}/>
          </Form.Group>
        </Row>
      </div>
    );
  }
}
