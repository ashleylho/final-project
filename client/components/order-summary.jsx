import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class OrderSummary extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <Card className="order-sum-card mx-3 mb-3 mt-2">
          <Card.Header className="fs-4 order-sum-header">Order Summary</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex fw-bold text-secondary justify-content-between">
              <span>Subtotal</span>
              <span>${this.props.subtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex text-secondary justify-content-between">
              <span>Standard Shipping</span>
              <span>FREE</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex text-secondary justify-content-between">
              <span>Estimated Taxes</span>
              <span>--</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex text-secondary fw-bold justify-content-between">
              <span>Order Total</span>
              <span>${this.props.subtotal}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <div className="d-flex justify-content-center">
          <Button as="a" className="mx-3 checkout-btn border-0 w-100" href="#checkout">{this.props.checkout}</Button>
        </div>
      </div>
    );
  }
}
