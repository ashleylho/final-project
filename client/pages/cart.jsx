import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: null,
      cartItems: []
    };
    this.cartItems = this.cartItems.bind(this);
    this.subtotal = this.subtotal.bind(this);
    this.cart = this.cart.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      fetch('api/products/cart/{this.props.cartId}', {
        method: 'GET',
        headers: {
          'X-Access-Token': token
        }
      })
        .then(res => res.json())
        .then(cart => this.setState({ cartId: this.props.cartId, cartItems: cart }))
        .catch(err => console.error(err));
    }
  }

  cartItems() {
    const items = this.state.cartItems;
    const listItems = items.map((item, index) => {
      return <ListGroup.Item key={index}>
        <div className="d-flex border border-1 rounded py-2 cart-item">
          <div className="col-6 text-center">
            <img className="cart-img img-fluid" src={item.imageUrl} />
          </div>
          <div className="cart-details col-6 d-flex flex-column justify-content-center">
            <h6 className="fw-light">{item.name} Snowboard</h6>
            <h6 className="fw-light">Size: {item.size}</h6>
            <h6 className="fw-light">Qty: <span className="fw-bold">1</span></h6>
            <h6 className="fw-light">Price: <span className="fw-bold">${item.price / 100}</span></h6>
          </div>
        </div>
      </ListGroup.Item>;
    });
    return (<ListGroup className="col-md-8 mb-3">{listItems}</ListGroup>);
  }

  subtotal() {
    let subtotal = 0;
    this.state.cartItems.map(item => {
      return (subtotal += item.price);
    });
    return subtotal / 100;
  }

  cart() {
    if (this.state.cartItems.length === 0) {
      return (
        <div className="mt-3 empty-cart-container">
          <div className="empty-cart text-center py-5 fs-4 px-2 rounded border border-secondary mx-3">
            <span className="d-block fs-4 py-5">Your shopping cart is currently empty.</span>
          </div>
          <Button as="a" href="#products" className="d-block my-4 empty-cart-btn border-0 mx-3">Shop for Gear</Button>
        </div>
      );
    } else {
      return (
        <div className="cart-and-summary">
          {this.cartItems()}
          <div className="col-md-4">
            <Card className="order-sum-card mx-3 mb-3 mt-2">
              <Card.Header className="fs-4 order-sum-header">Order Summary</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex fw-bold text-secondary justify-content-between">
                  <span>Subtotal</span>
                  <span>${this.subtotal()}</span>
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
                  <span>${this.subtotal()}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </div>
      );
    }
  }

  render() {
    // if (this.state.cartItems.length === 0) {
    //   return (
    //     <div className="d-flex flex-column justify-content-center">
    //       <div className="text-center py-5 fs-4 rounded border border-secondary w-50 mx-auto">
    //         Your shopping cart is currently empty.
    //         {/* <span className="d-block fs-4">Your shopping cart is currently empty.</span> */}
    //       </div>
    //       <Button as="a" href="#products" className="my-4 empty-cart border-0 w-50 mx-auto">Shop for Gear</Button>
    //     </div>
    //   );
    // } else {
    return (
      <div className="shopping-cart">
        <div className="d-flex justify-content-between mb-2">
          <div className="px-3 mt-3">
            <h4 className="mb-0">Your Shopping Cart</h4>
            <span>{this.state.cartItems.length} item(s)</span>
          </div>
          <div className="px-3 mt-3 text-end">
            <h4 className="fw-bolder mb-0">${this.subtotal()}</h4>
            <span className="fs-6">Subtotal</span>
          </div>
        </div>
        {this.cart()}
        {/* <div className="cart-and-summary">
          {this.cartItems()}
          <div className="col-md-4">
            <Card className="order-sum-card mx-3 mb-3 mt-2">
              <Card.Header className="fs-4 order-sum-header">Order Summary</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex fw-bold text-secondary justify-content-between">
                  <span>Subtotal</span>
                  <span>${this.subtotal()}</span>
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
                  <span>${this.subtotal()}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </div> */}
      </div >
    );
  }
}
