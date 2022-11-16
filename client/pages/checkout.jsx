import React, { useState, useEffect } from 'react';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import OrderSummary from '../components/order-summary';
// import Button from 'react-bootstrap/Button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import InjectedCheckoutForm from '../components/checkout-form';

const stripePromise = loadStripe('pk_test_51LunS5KbTmfJuQ2gX7JXiXBFsNz5hGUFYM2lwPy83t5vcp2klOQEdMs1icabJ1HGnYZ4Cxn0BgGeiiO2qmqdQwB700kLFc1AF4');

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ id: 'xl-tshirt' }],
        total: 45678
      }
      )
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
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
        <Elements options={options} stripe={stripePromise}>
          <InjectedCheckoutForm stripe={stripePromise}/>
        </Elements>
      )}
    </div>
  );
}
// class Checkout extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       checkout: 'contactInfo'
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.contactInfo = this.contactInfo.bind(this);
//     this.payment = this.payment.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleSubmit(event) {
//     const token = window.localStorage.getItem('token');
//     event.preventDefault();
//     // fetch('api/checkout', {
//     //   method: 'POST',
//     //   headers: {
//     //     'X-Access-Token': token
//     //   }
//   }

//   handleClick(event) {
//     this.setState({ checkout: 'payment' });
//   }

//   contactInfo() {
//     return (
//       <>
// <div className="mx-3 border px-3 py-2 rounded mb-4">
//   <Form.Group>
//     <Form.Label>Email</Form.Label>
//     <Form.Control type="email" required />
//   </Form.Group>
//   <Row>
//     <Form.Group as={Col} xs="6">
//       <Form.Label className="mt-2">First Name</Form.Label>
//       <Form.Control type="text" required />
//     </Form.Group>
//     <Form.Group as={Col} xs="6">
//       <Form.Label className="mt-2">Last Name</Form.Label>
//       <Form.Control type="text" required />
//     </Form.Group>
//   </Row>
//   <Form.Group>
//     <Form.Label className="mt-2">Address</Form.Label>
//     <Form.Control type="text" required />
//   </Form.Group>
//   <Form.Group>
//     <Form.Label className="mt-2">Address 2</Form.Label>
//     <Form.Control type="text" />
//   </Form.Group>
//   <Row>
//     <Form.Group as={Col} xs="5">
//       <Form.Label className="mt-2">City</Form.Label>
//       <Form.Control type="text" required />
//     </Form.Group>
//     <Form.Group as={Col} xs="3">
//       <Form.Label className="mt-2">State</Form.Label>
//       <Form.Control type="text" required />
//     </Form.Group>
//     <Form.Group as={Col} xs="4">
//       <Form.Label className="mt-2">Zip</Form.Label>
//       <Form.Control type="text" required />
//     </Form.Group>
//   </Row>
// </div>
//         <OrderSummary subtotal="2555" />
//         <div className="d-flex justify-content-center">
//           <Button onClick={this.handleClick} className="payment-btn mx-3 border-0 mb-3 w-100">Continue to Payment</Button>
//         </div>
//       </>
//     );
//   }

//   payment() {
//     return <App />;
//   }

//   render() {
//     return <App />;
//     // let form;
//     // if (this.state.checkout === 'contactInfo') {
//     //   form = this.contactInfo();
//     // } else if (this.state.checkout === 'payment') {
//     //   form = this.payment();
//     // }
//     // return (
//     //   <>
//     //     <h5 className="mx-3 mt-4">Personal Information</h5>
//     //     <Form onSubmit={this.handleSubmit}>{form}
//     //     </Form>
//     //   </>
//     // );
//   }
// }
