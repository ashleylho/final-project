import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class Navigation extends React.Component {
  render() {
    return (
      <Navbar className='py-0 bg-img w-100'>
        <Nav className="justify-content-between align-items-center overlay w-100">
          <Navbar.Brand className="brand mb-0" href="#home">{'Trader Snow\'s'}</Navbar.Brand>
          <Nav.Link href="#products" className="nav-prod-link mt-1">PRODUCTS</Nav.Link>
          <Nav.Link className="px-0 mt-0 fs-2" href="#cart"><i className="mx-3 bi bi-cart-fill" /></Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
