import React from 'react';
import Container from 'react-bootstrap/Container';
import parseRoute from '../lib/parse-route';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      route: parseRoute(window.location.hash),
      loading: false
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
    if (this.state.product === {}) {
      this.setState({ loading: false });
    }
  }

  sizes() {
    const sizes = [];
    for (let i = 0; i < this.state.product.length; i++) {
      sizes.push(this.state.product[i].size);
    }
    const listItems = sizes.map(size => {
      return <ListGroup.Item className="fs-5 border border-secondary d-inline-block w-auto mx-1 rounded my-3" key={size}>
        <div>{size}</div>
      </ListGroup.Item>;
    });
    return (
      <ListGroup className="d-flex flex-row flex-wrap">
        {listItems}
      </ListGroup>
    );
  }

  render() {
    if (this.state.loading === true) {
      const product = this.state.product[0];
      const terrain = product.terrain;
      const result = terrain.join(', ');
      return (
        <>
          <div className="mobile mx-3">
            <h1 className="text-center fw-bold py-3">{product.name} Snowboard</h1>
            <div className="text-center">
              <img className="img-fluid" src={product.imageUrl} />
              <div className="py-3 text-secondary">Base Colors May Vary</div>
            </div>
            <hr />
            <p className="mb-0">Select Size(cm)</p>
            {this.sizes()}
            <p className="fw-bold">${product.price / 100}</p>
            <hr />
            <h5 className="fw-bold">Product Details</h5>
            <p>{product.description}</p>
            <hr />

            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Specs</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <div className="col-3 fw-bold">Profile Type</div>
                    <div className="col-9">{product.profileName} - {product.profileDescription}</div>
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
                    <div className="col-9">{result}</div>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <hr />
          </div>
          <Container className="desktop my-5">
            <Row className="d-md-flex flex-row flex-wrap">
              <div className="col-6">
                <h2 className="col fw-bold py-3">{product.name} Snowboard</h2>
                <p className="mb-0 fs-5">Select Size(cm)</p>
                {this.sizes()}
                <p className="fw-bold fs-4">${product.price / 100}</p>
                <p>{product.description}</p>
              </div>
              <div className="col-6 text-center d-flex flex-column justify-content-center order-md-first">
                <img className="img-fluid" src={product.imageUrl} />
                <div className="py-3 text-secondary">Base Colors May Vary</div>
              </div>
            </Row>
            <div>
              <h5 className="fw-bold fs-4">Specs</h5>
              <hr />
              <Row>
                <div className="col-3 fw-bold fs-5">Profile Type</div>
                <div className="col-9">{product.profileName} - {product.profileDescription}</div>
              </Row>
              <hr />
              <Row>
                <div className="col-3 fw-bold fs-5">Flex</div>
                <div className="col-9">{product.flex}</div>
              </Row>
              <hr />
              <Row>
                <div className="col-3 fw-bold fs-5">Shape</div>
                <div className="col-9">{product.shapeName} - {product.shapeDescription}</div>
              </Row>
              <hr />
              <Row>
                <div className="col-3 fw-bold fs-5">Edge Tech</div>
                <div className="col-9">{product.edgeTechName} - {product.edgeTechDescription}</div>
              </Row>
              <hr />
              <Row>
                <div className="col-3 fw-bold fs-5">Ability Level</div>
                <div className="col-9">{product.abilityLevel}</div>
              </Row>
              <hr />
              <Row>
                <div className="col-3 fw-bold fs-5">Terrain</div>
                <div className="col-9">{result}</div>
              </Row>
              <hr />
            </div >
          </Container>
        </>
      );
    }
  }
}
