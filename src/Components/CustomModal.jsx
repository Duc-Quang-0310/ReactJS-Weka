import {Button, Modal} from "react-bootstrap";

export const CustomModal = ({modalTitle, modalShow, handleClose, children, mainActionTitle, handleMainAction}) => {
  return (
    <Modal show={modalShow} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleMainAction}>
          {mainActionTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};