import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OrderSummary from '../components/order-summary';
import Button from 'react-bootstrap/Button';
import { ElementsConsumer, PaymentElement } from '@stripe/react-stripe-js';

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <Checkout stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: 'contactInfo',
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      costs: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.payment = this.payment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    fetch('api/cost', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(costs => this.setState({ costs }))
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  payment() {
    if (!this.state.email || !this.state.firstName || !this.state.lastName || !this.state.address ||
        !this.state.city || !this.state.state || !this.state.zip) {
      alert('Please fill out the missing information.');
    } else {
      this.setState({ checkout: 'payment' });
    }
  }

  nextButton() {
    if (this.state.checkout === 'contactInfo') {
      return (
        <div className="col-md-4 contact-info-summary">
          <OrderSummary subtotal={this.state.costs.subtotal} taxes={`$${this.state.costs.taxes}`} total={this.state.costs.total}/>
          <div className="d-flex justify-content-center">
            <Button type="button" className="mx-3 mb-3 w-100 ctn-to-payment-btn border-0" onClick={this.payment}>Continue to Payment</Button>
          </div>
        </div>
      );
    }
    return null;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const token = window.localStorage.getItem('token');
    const address2 = this.state.address2 === '' ? null : this.state.address2;
    const body = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      total: 45678
    };
    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .catch(err => console.error(err));

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      return;
    }

    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: new URL('/#home', window.location).href
      }
    })
      .catch(err => console.error(err));

  };

  render() {
    const header = this.state.checkout === 'contactInfo' ? 'Personal Information' : 'Payment Information';
    return (
      <>
        <h5 className="mx-3 mt-3">{header}</h5>
        <Form onSubmit={this.handleSubmit}>
          <div className="d-md-flex">
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
          </div>
          <CheckoutForm checkout={this.state.checkout} subtotal={this.state.costs.subtotal} taxes={`$${this.state.costs.taxes}`} total={this.state.costs.total}/>
        </Form>
      </>
    );
  }
}

class CheckoutForm extends React.Component {
  render() {
    if (this.props.checkout !== 'payment') {
      return null;
    }
    return (
      <div className="d-md-flex">
        <PaymentElement className="mx-3 mb-3 col-md-8"/>
        <div className="col-md-4">
          <OrderSummary subtotal={this.props.subtotal} taxes={this.props.taxes} total={this.props.total}/>
          <div className="d-flex justify-content-center">
            <Button type="submit" className="mx-3 mb-3 w-100 ctn-to-payment-btn border-0">Place Order</Button>
          </div>
        </div>
      </div>
    );
  }
}

class ContactInfo extends React.Component {
  render() {
    if (this.props.checkout !== 'contactInfo') {
      return null;
    }
    return (
      <div className="mx-3 border px-3 col-md-8 py-2 rounded mb-4">
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
            required
            onChange={this.props.handleChange}/>
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
