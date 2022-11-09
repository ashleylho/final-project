import React from 'react';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../server/public/styles.css';
import Navigation from './components/navbar';
import Products from './pages/products';
import ProductDetails from './components/product-details';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { path, params } = this.state.route;
    if (path === 'home' || path === 'products') {
      return (
        <>
          <Home />
          <Products />
        </>
      );
    }
    if (params[0]) {
      return <ProductDetails />;
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
