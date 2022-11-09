import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class Navigation extends React.Component {
  render() {
    return (
      <Navbar className='pt-0'>
        <div className='bg-img w-100'>
          <div className='overlay'>
            <Nav className="align-items-center">
              <Navbar.Brand className="brand mb-0" href="#home">{'Trader Snow\'s'}</Navbar.Brand>
              <Nav.Link href="#products">PRODUCTS</Nav.Link>
            </Nav>
          </div>
        </div>
      </Navbar>
    );
  }
}
