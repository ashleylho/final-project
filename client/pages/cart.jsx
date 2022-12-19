import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import OrderSummary from '../components/order-summary';
import totalCost from '../lib/totalCost';
import Col from 'react-bootstrap/Col';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
    this.cartItems = this.cartItems.bind(this);
    this.cart = this.cart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      fetch('/api/cart', {
        method: 'GET',
        headers: {
          'X-Access-Token': token
        }
      })
        .then(res => res.json())
        .then(cart => this.setState({ cartItems: cart }))
        .catch(err => console.error(err));
    }
  }

  cartItems() {
    const items = this.state.cartItems;
    const listItems = items.map((item, index) => {
      return <ListGroup.Item key={index}>
        <div className="d-flex border border-1 rounded py-2 cart-item align-items-center">
          <div className="col-6 text-center">
            <img className="cart-img img-fluid" src={item.imageUrl} />
          </div>
          <div className="cart-details col-6 d-flex flex-column">
            <h6 className="fw-light">{item.name} Snowboard</h6>
            <h6 className="fw-light">Size: {item.size}</h6>
            <h6 className="fw-light">Qty:
              <button disabled={item.quantity <= 1} onClick={this.updateQuantity} className="border-0 bg-white p-0">
                <i data-id={item.productId} data-size={item.size} className="bi bi-dash-circle mx-1" />
              </button>
              <span className="fw-bold">{item.quantity}</span>
              <button onClick={this.updateQuantity} className="border-0 bg-white p-0">
                <i data-id={item.productId} data-size={item.size} className="bi bi-plus-circle mx-1" />
              </button>
            </h6>
            <h6 className="fw-light">
              Price: <span className="fw-bold">${item.price / 100}</span>
            </h6>
            <Col className="flex-none">
              <Button onClick={this.removeItem} data-id={item.productId} data-size={item.size} className="btn border-0 bg-white p-0 text-start text-decoration-underline remove-btn">Remove Item</Button>
            </Col>
          </div>
        </div>
      </ListGroup.Item>;
    });
    return (<ListGroup className="col-md-8 mb-3">{listItems}</ListGroup>);
  }

  cart() {
    const total = totalCost(this.state.cartItems);
    if (!this.state.cartItems.length) {
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
            <OrderSummary subtotal={total.subtotal} taxes="--" total={total.subtotal}/>
            <div className="d-flex justify-content-center">
              <Button as="a" className="mx-3 checkout-btn border-0 w-100" href="#checkout">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      );
    }
  }

  removeItem(event) {
    const productId = event.target.dataset.id;
    const size = event.target.dataset.size;
    const token = window.localStorage.getItem('token');
    fetch(`api/product/${productId}/${size}`, {
      method: 'DELETE',
      headers: { 'X-Access-Token': token }

    })
      .then(res => res.json())
      .then(cart => this.setState({ cartItems: cart }))
      .catch(err => console.error(err));
  }

  updateQuantity(event) {
    const productId = event.target.dataset.id;
    const size = event.target.dataset.size;
    const token = window.localStorage.getItem('token');
    if (event.target.className.includes('bi-plus-circle')) {
      fetch(`api/increase/${productId}/${size}`, {
        method: 'PATCH',
        headers: {
          'X-Access-Token': token
        }
      })
        .then(res => res.json())
        .then(cart => this.setState({ cartItems: cart }))
        .catch(err => console.error(err));
    }
    if (event.target.className.includes('bi-dash-circle')) {
      fetch(`api/decrease/${productId}/${size}`, {
        method: 'PATCH',
        headers: {
          'X-Access-Token': token
        }
      })
        .then(res => res.json())
        .then(cart => this.setState({ cartItems: cart }))
        .catch(err => console.error(err));
    }
  }

  render() {
    const cost = totalCost(this.state.cartItems);
    return (
      <div className="shopping-cart">
        <div className="d-flex justify-content-between mb-2">
          <div className="px-3 mt-3">
            <h4 className="mb-0">Your Shopping Cart</h4>
            <span>{this.state.cartItems.length} item(s)</span>
          </div>
          <div className="px-3 mt-3 text-end">
            <h4 className="fw-bolder mb-0">${cost.subtotal}</h4>
            <span className="fs-6">Subtotal</span>
          </div>
        </div>
        {this.cart()}
      </div >
    );
  }
}
