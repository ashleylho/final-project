import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Products extends React.Component {

  render() {
    return (
      <>
        <h2>{'Women\'s Snowboards'}</h2>
        <ListGroup horizontal>
          <ListGroup.Item>Hello</ListGroup.Item>
        </ListGroup>
      </>
    );
  }
}
