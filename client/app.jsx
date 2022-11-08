import React from 'react';
// import Home from './pages/home';
import Navigation from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../server/public/styles.css';

export default class App extends React.Component {
  render() {
    // return <Home />;
    return <Navigation />;
  }
}
