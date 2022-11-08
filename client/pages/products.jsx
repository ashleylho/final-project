import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error(err));
  }

  render() {
    const listItems = this.state.products.map(product => {
      return <ListGroup.Item key={product.productId}>
        <div>
          <img src={product.imageUrl} />
          <h5>{product.name}</h5>
          <h5>{`$${product.price / 100}`}</h5>
        </div>
      </ListGroup.Item>;
    });
    return (
      <>
        <h2>{'Women\'s Snowboards'}</h2>
        <ListGroup horizontal>
          {listItems}
        </ListGroup>
      </>
    );
  }
}
