import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class Navigation extends React.Component {
  render() {
    return (
      <Navbar className='py-0'>
        <div className='bg-img w-100'>
          <div className='overlay'>
            <Nav className="align-items-center">
              <Navbar.Brand className="brand mb-0" href="#home">{'Trader Snow\'s'}</Navbar.Brand>
              <div className="d-flex">
                <Nav.Link href="#products" className="">PRODUCTS</Nav.Link>
                <Nav.Link className="px-0 mt-0 fs-2" href="#cart"><i className="bi bi-cart-fill" /></Nav.Link>
              </div>
            </Nav>
          </div>
        </div>
      </Navbar>
    );
  }
}
