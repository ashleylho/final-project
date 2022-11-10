import React from 'react';
import Container from 'react-bootstrap/Container';
import parseRoute from '../lib/parse-route';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      route: parseRoute(window.location.hash),
      loading: false
      // specsAreOpen: false
    };
    this.sizes = this.sizes.bind(this);
  }

  componentDidMount() {
    const { params } = this.state.route;
    const paramObject = Object.fromEntries(params);
    const productId = paramObject.product;
    fetch(`api/products/${productId}`)
      .then(res => res.json())
      .then(product => this.setState({ product, loading: true }))
      .catch(err => console.error(err));
  }

  sizes() {
    const sizes = [];
    for (let i = 0; i < this.state.product.length; i++) {
      sizes.push(this.state.product[i].size);
    }
    const listItems = sizes.map(size => {
      return <ListGroup.Item key={size}>
        <div>{size}</div>
      </ListGroup.Item>;
    });
    return (
      <ListGroup>
        {listItems}
      </ListGroup>
    );
  }

  render() {
    if (this.state.loading === true) {
      const product = this.state.product[0];
      return (
        <Container>
          <div className="text-center">
            <h1 className="fw-bold py-3">{product.name}</h1>
            <img className="img-fluid" src={product.imageUrl} />
            <div className="py-3 text-secondary">Base Colors May Vary</div>
          </div>
          <hr />
          <p>Select Size(cm)</p>
          <div>{this.sizes()}</div>
          <p className="fw-bold">${product.price / 100}</p>
          <hr />
          <h5 className="fw-bold">Product Details</h5>
          <p>{product.description}</p>
          <hr />
          <h5 className="fw-bold">Specs</h5>
          <hr />
          <Row>
            <div className="col-3 fw-bold">Profile Type</div>
            <div className="col-9">{product.profileDescription}</div>
          </Row>
          <hr />
          <Row>
            <div className="col-3 fw-bold">Flex</div>
            <div className="col-9">{product.flex}</div>
          </Row>
          <hr />
          <Row>
            <div className="col-3 fw-bold">Shape</div>
            <div className="col-9">{product.shapeName} - {product.shapeDescription}</div>
          </Row>
          <hr />
          <Row>
            <div className="col-3 fw-bold">Edge Tech</div>
            <div className="col-9">{product.edgeTechName} - {product.edgeTechDescription}</div>
          </Row>
          <hr />
          <Row>
            <div className="col-3 fw-bold">Ability Level</div>
            <div className="col-9">{product.abilityLevel}</div>
          </Row>
          <hr />
          <Row>
            <div className="col-3 fw-bold">Terrain</div>
            <div className="col-9">{product.terrain}</div>
          </Row>
        </Container>
      );
    }
  }
}
