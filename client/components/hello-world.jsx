import React from 'react';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="postion-relative">
          <img className="w-100" src="/winter.jpg" />
        </div>
        <div className="rounded py-5 px-5 shadow position-absolute splash">
          <h4 className="mountains py-2 mb-3 text-center text-uppercase">the mountains are calling</h4>
          <Button variant="Secondary" className="shop d-block mx-auto py-2 px-4 text-center text-white bg-dark text-uppercase">shop the collection</Button>
        </div>
      </div>
    );
  }
}
