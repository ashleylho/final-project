import React from 'react';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cartItems: null };
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

  render() {
    return (
      <h1>hi</h1>
    );
  }
}
