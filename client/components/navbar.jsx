import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class Navigation extends React.Component {
  render() {
    return (
      <Navbar>
        <div className='bg-img'>
          <div className='overlay'>
            <Nav>
              <Navbar.Brand className="brand" href="#home">{'Trader Snow\'s'}</Navbar.Brand>
              <Nav.Link href="#products">PRODUCTS</Nav.Link>
            </Nav>
          </div>
        </div>
      </Navbar>
    );
  }
}
