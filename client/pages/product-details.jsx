import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CartModal from '../components/cart-modal';
import jwtDecode from 'jwt-decode';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      size: null,
      isOpen: false,
      cart: null
    };
    this.sizes = this.sizes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productId}`)
      .then(res => res.json())
      .then(product => this.setState({ product, loading: false }))
      .catch(err => console.error(err));
    const token = window.localStorage.getItem('token');
    const tokenStored = token ? jwtDecode(token) : null;
    this.setState({ cart: tokenStored });
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ size: Number(value) });
  }

  addToCart(event) {
    event.preventDefault();
    if (this.state.size === null) {
      alert('Please select a size.');
    } else {
      const cartItem = {
        productId: this.props.productId,
        quantity: 1,
        size: this.state.size
      };
      const token = window.localStorage.getItem('token');
      if (this.state.cart) {
        fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': token
          },
          body: JSON.stringify(cartItem)
        })
          .then(res => res.json())
          .then(res => {
            this.openModal();
          })
          .catch(err => console.error(err));
      } else if (!this.state.cart) {
        fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cartItem)
        })
          .then(res => res.json())
          .then(res => {
            window.localStorage.setItem('token', res.token);
            this.openModal();
          })
          .catch(err => console.error(err));
      }
    }
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  sizes() {
    const sizes = this.state.product.sizes;
    const sizeInputs = sizes.map(size => {
      return (
        <label key={size} className="size-label px-2 fs-5 size-btn border border-secondary mx-1 rounded my-2">
          <input className="size-input" type="radio" value={size} id={size} name="sizes" onChange={this.handleChange} />
          <span>{size}</span>
        </label>
      );
    });
    return sizeInputs;
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
          <form onSubmit={this.addToCart}>
            {this.sizes()}
            <p className="fw-bold fs-5 mb-1">${product.price / 100}</p>
            <p className="mb-1">Quantity</p>
            <div className="d-flex justify-content-between">
              <div className="col-4 me-1">
                <i className="bi bi-plus-circle fs-2" />
                <span className= "px-3 py-1 border border-dark rounded mx-2">1</span>
                <i className="bi bi-dash-circle fs-2" />
              </div>
              <div className="col-8">
                <Button type="submit" className="w-100 d-inline px-5 border-0 add-to-cart" variant="primary">Add to Cart</Button>
              </div>
            </div>
          </form>
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
              <form onSubmit={this.addToCart}>
                {this.sizes()}
                <p className="fw-bold fs-4">${product.price / 100}</p>
                <p>{product.description}</p>
                <p className="mb-1">Quantity</p>
                <div className="d-flex justify-content-between">
                  <div className="col-lg-4 quantity">
                    <i className="bi bi-plus-circle fs-2" />
                    <span className="fs-4 px-4 py-1 border border-dark rounded mx-2">1</span>
                    <i className="bi bi-dash-circle fs-2" />
                  </div>
                  <div className="col-lg-8">
                    <Button type="submit" className="w-100 d-inline px-5 border-0 add-to-cart" variant="primary">Add to Cart</Button>
                  </div>
                </div>
              </form>
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
        <CartModal productinfo={this.state.product} size={this.state.size} show={this.state.isOpen} onHide={this.closeModal} />
      </>
    );
  }
}
