import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

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
      return <ListGroup.Item className="border-0 col-sm-6 col-lg-3" key={product.productId}>
        <div>
          <img className="w-100" src={product.imageUrl} />
          <h5 className="mt-4 text-center">{product.name}</h5>
          <h5 className="text-center price">{`$${product.price / 100}`}</h5>
          <hr />
        </div>
      </ListGroup.Item>;
    });
    return (
      <Container>
        <h2 className="p-1 my-4 text-center">{'Women\'s Snowboards'}</h2>
        <ListGroup className="w-100 d-flex flex-row flex-wrap">
          {listItems}
        </ListGroup>
      </Container>
    );
  }
}
