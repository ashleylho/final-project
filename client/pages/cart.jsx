import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cartItems: null };
    this.cartItems = this.cartItems.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    fetch('api/products/cart/{this.props.cartId}', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(cart => this.setState({ cartItems: cart }))
      .catch(err => console.error(err));
  }

  cartItems() {
    const items = this.state.cartItems;
    const listItems = items.map((item, index) => {
      return <ListGroup.Item key={index}>
        <div className="w-100 d-flex">
          <div className="col-6">
            <img className="img-fluid" src={item.imageUrl} />
          </div>
          <div className="col-6">
            <h5 className="mt-4">{item.name} Snowboard</h5>
            <h5 className="fw-light">Size: {item.size}</h5>
            <h5 className="fw-light">Qty: 1</h5>
            <h5 className="fw-light">Price: ${item.price / 100}</h5>
          </div>
        </div>
      </ListGroup.Item>;
    });
    return (<ListGroup>{listItems}</ListGroup>);
  }

  render() {
    if (this.state.cartItems === null) {
      return <h1>yo</h1>;
    } else {
      return (
        <>
          {this.cartItems()}
          <h1>Order Summary</h1>
        </>
      );
    }
  }
}
