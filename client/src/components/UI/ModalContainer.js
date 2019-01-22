import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

const ModalContainer = ({
  modalDeleteState, onClose, modalHeaderText, confirm
}) => (
  <Modal open={modalDeleteState} onClose={onClose}>
    <Modal.Header>{modalHeaderText}</Modal.Header>
    <Modal.Content>
      <p>Are you sure you want to delete this word?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onClose} negative>
        No
      </Button>
      <Button
        onClick={() => {
          confirm();
        }}
        positive
        labelPosition="right"
        icon="checkmark"
        content="Yes"
      />
    </Modal.Actions>
  </Modal>
);

ModalContainer.propTypes = {
  modalDeleteState: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modalHeaderText: PropTypes.string,
  confirm: PropTypes.func.isRequired
};

ModalContainer.defaultProps = {
  modalHeaderText: null
};

export default ModalContainer;
