import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CartModal(props) {
  return (
    <Modal
      {...props}
      // size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Added to your cart!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-100 d-flex">
          <div className="col-6">
            <img className="img-fluid" src="https://images.evo.com/imgp/700/220847/914108/roxy-xoxo-pro-c3-snowboard-women-s-2023-.jpg" />
          </div>
          <div className="col-6">
            <h5 className="mt-4">Roxy XOXO Snowboard</h5>
            <h5 className="fw-light">Size: 145</h5>
            <h5 className="fw-light">Qty: 1</h5>
            <h5 className="fw-light">Price: $599.99</h5>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
