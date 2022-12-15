import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'services/axios';
import DeleteObject from 'models/DeleteObject';

interface IConfirmationModal {
  data?: DeleteObject;
  handleClose: () => void;
}

const ConfirmationModal = ({ data, handleClose }: IConfirmationModal) => {
  const [loading, setLoading] = React.useState(false);

  const onDelete = async () => {
    if (!data || !data?.id) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`/${data.id}`);
      console.log('Deleted successfully!');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={!!data}
      className="confirm-modal"
      onHide={() => handleClose()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-100 text-center p-4">
          <h5>
            Are you sure you want to delete {data?.title || 'this resource'}?
          </h5>

          <p>This action cant be undone.</p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onDelete} variant="outline">
          {loading ? 'Loading...' : 'Yes Delete'}
        </Button>

        <Button className="ms-4" variant="danger" onClick={() => handleClose()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
