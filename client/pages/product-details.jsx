import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      size: null
    };
    this.sizes = this.sizes.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`api/products/${this.props.productId}`)
      .then(res => res.json())
      .then(product => this.setState({ product, loading: false }))
      .catch(err => console.error(err));
  }

  handleClick(event) {
    this.setState({ size: Number(event.target.dataset.id) });
  }

  sizes() {
    const sizes = this.state.product.sizes;
    const listItems = sizes.map(size => {
      return <ListGroup.Item as="button" onClick={this.handleClick} data-id={size} className="size-btn fs-5 border border-secondary d-inline-block w-auto mx-1 rounded my-3" key={size}>
        {size}
      </ListGroup.Item>;
    });
    return (
      <ListGroup className="d-flex flex-row flex-wrap">
        {listItems}
      </ListGroup>
    );
  }

  render() {
    const product = this.state.product;
    if (this.state.loading) return null;
    const terrain = product.terrain;
    const result = terrain.join(', ');
    return (
      <>
        <div className="product-details-mobile mx-3">
          <h2 className="text-center fw-bold py-3">{product.name} Snowboard</h2>
          <div className="text-center">
            <img className="img-fluid" src={product.imageUrl} />
            <div className="py-3 text-secondary">Base Colors May Vary</div>
          </div>
          <hr />
          <p className="mb-0">Select Size(cm)</p>
          {this.sizes()}
          <p className="fw-bold fs-5">${product.price / 100}</p>
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
        <Container className="product-details-desktop my-5">
          <Row className="d-md-flex flex-row flex-wrap">
            <div className="col-6">
              <h2 className="col fw-bold py-3">{product.name} Snowboard</h2>
              <p className="mb-0 fs-5">Select Size(cm)</p>
              {this.sizes()}
              <p className="fw-bold fs-4">${product.price / 100}</p>
              <p>{product.description}</p>
            </div>
            <div className="col-6 d-img text-center d-flex flex-column justify-content-center order-md-first">
              <img className="p-img" src={product.imageUrl} />
              <div className="py-3 text-secondary">Base Colors May Vary</div>
            </div>
          </Row>
          <div>
            <h5 className="fw-bold fs-4 mt-3">Specs</h5>
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
