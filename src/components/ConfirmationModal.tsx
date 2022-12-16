import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import DeleteObject from 'models/DeleteObject';
import { PostContext } from 'contexts/Posts';
import { notify } from 'utilities/toaster';

interface IConfirmationModal {
  data?: DeleteObject;
  handleClose: () => void;
}

const ConfirmationModal = ({ data, handleClose }: IConfirmationModal) => {
  const { removePost, updating } = React.useContext(PostContext);

  const onDelete = async () => {
    if (!data || !data?.id) {
      return;
    }

    try {
      await removePost(data.id);
      notify({
        type: 'success',
        message: `${data.title} was deleted successfully`
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
          {updating ? 'Loading...' : 'Yes Delete'}
        </Button>

        <Button className="ms-4" variant="danger" onClick={() => handleClose()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
