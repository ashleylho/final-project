import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export default class OrderSummary extends React.Component {
  render() {
    return (
      <div className="">
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
      </div>
    );
  }
}
