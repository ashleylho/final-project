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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      cart: null
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('token');
    const tokenStored = token ? jwtDecode(token) : null;
    this.setState({ cart: tokenStored });
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
    if (path === 'cart' && this.state.cart) {
      return <Cart cartId={this.state.cart.cartId}/>;
    } else if (!this.state.cart) {
      return <Cart />;
    }
    if (path === 'checkout') {
      return <CheckoutPage />;
    }
  }

  render() {
    return (
      <>
        <Navigation />
        <div>
          {this.renderPage()}
        </div>
      </>
    );
  }
}
