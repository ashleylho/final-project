import React from 'react';
import Container from 'react-bootstrap/Container';
import parseRoute from '../lib/parse-route';
import Row from 'react-bootstrap/Row';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      route: parseRoute(window.location.hash),
      loading: false,
      specsAreOpen: false
    };
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

  render() {
    if (this.state.loading === true) {
      const product = this.state.product[0];
      return (
        <Container>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} />
          <div>Base Colors May Vary</div>
          <hr />
          <p>Select Size(cm)</p>
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
