import React from 'react';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../server/public/styles.css';
import '../server/public/layout.css';
import Navigation from './components/navbar';
import Products from './pages/products';
import ProductDetails from './pages/product-details';
import parseRoute from './lib/parse-route';
import Cart from './pages/cart';
import jwtDecode from 'jwt-decode';
import CheckoutPage from './pages/checkout';
import ConfirmationModal from './components/confirmation-modal';
import AppContext from './lib/app-context';
import removeSearchParam from './lib/remove-search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      cart: null,
      isOpen: false
    };
    this.renderPage = this.renderPage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const searchParams = new URL(window.location).searchParams;
    if (searchParams.has('payment_intent')) {
      window.localStorage.removeItem('token');
      this.openModal();
    } else {
      const token = window.localStorage.getItem('token');
      const tokenStored = token ? jwtDecode(token) : null;
      this.setState({ cart: tokenStored });
    }
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
    window.location.search = '';
  }

  renderPage() {
    const { route } = this.state;
    const { path } = route;
    if (path === 'home' || path === 'products' || path === '') {
      return (
        <>
          <Home />
          <Products />
        </>
      );
    }
    if (path === 'product') {
      const productId = route.params.get('product');
      return <ProductDetails productId={productId}/>;
    }
    if (path === 'cart') {
      const cartId = this.state.cart
        ? this.state.cart.cartId
        : null;
      return <Cart cartId={cartId} />;
    }
    if (path === 'checkout') {
      return <CheckoutPage />;
    }
  }

  render() {
    const { openModal, checkout } = this;
    const contextValue = { checkout, openModal };
    return (
      <>
        <Navigation />
        <div>
          <AppContext.Provider value={contextValue}>
            {this.renderPage()}
            <ConfirmationModal show={this.state.isOpen} onHide={this.closeModal} />
          </AppContext.Provider>
        </div>
      </>
    );
  }
}
