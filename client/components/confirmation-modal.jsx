import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmationModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="mx-3" id="contained-modal-title-vcenter">
          Thank you for your order!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mx-3">
          <p className="mb-0">Your order number is #1.</p>
          <p>You should be receving a confirmation email shortly.</p>
          <p className="mb-0">Cheers,</p>
          <h1 className="my-0 confirmation-signature">{'Trader Snow\'s'}</h1>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button as="a" className="border-0 mx-3 w-100 confirm-shop-btn" href="#products" onClick={props.onHide}>Continue Shopping</Button>
      </Modal.Footer>
    </Modal>
  );
}
