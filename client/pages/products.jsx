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
    return (
      <>
        <h2>{'Women\'s Snowboards'}</h2>
        <ListGroup horizontal>
          <ListGroup.Item>Hello</ListGroup.Item>
        </ListGroup>
      </>
    );
  }
}
