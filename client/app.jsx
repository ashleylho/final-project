import React from 'react';
// import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../server/public/styles.css';
import Navigation from './components/navbar';
import Products from './pages/products';

export default class App extends React.Component {
  render() {
    // return <Home />;
    return (
      <div>
        <Navigation />
        <Products />
      </div>
    );
  }
}
