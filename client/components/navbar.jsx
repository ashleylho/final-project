import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className='bg-img'>
        <div className='overlay'>
          <nav className="navbar">
            <h3 className="brand">{'Trader Snow\'s'}</h3>
            <a className="nav-link" href="#products">PRODUCTS</a>
          </nav>
        </div>
      </div>
    );
  }
}
