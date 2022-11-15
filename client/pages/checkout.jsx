import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OrderSummary from '../components/order-summary';

export default class Checkout extends React.Component {
  render() {
    return (
      <>
        <h5 className="mx-3 mt-4">Personal Information</h5>
        <Form className="mx-3 border px-3 py-2 rounded mb-4">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Row>
            <Form.Group as={Col} xs="6">
              <Form.Label className="mt-2">First Name</Form.Label>
              <Form.Control type="text" required/>
            </Form.Group>
            <Form.Group as={Col} xs="6">
              <Form.Label className="mt-2">Last Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label className="mt-2">Address</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Address 2</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Row>
            <Form.Group as={Col} xs="5">
              <Form.Label className="mt-2">City</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group as={Col} xs="3">
              <Form.Label className="mt-2">State</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group as={Col} xs="4">
              <Form.Label className="mt-2">Zip</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Row>
        </Form>
        <OrderSummary subtotal="2555" checkout='Continue to Payment'/>
      </>
    );
  }
}
