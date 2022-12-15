import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import IPost from 'models/Post';
import { formatDate } from 'utilities';

interface IViewModal {
  data?: IPost;
  handleClose: () => void;
}

const ViewModal = ({ data, handleClose }: IViewModal) => {
  return (
    <Modal
      show={!!data}
      onHide={() => handleClose()}
      centered
      size="lg"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>{data?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="view-post__row">
          <p className="view-post__title">title:</p>
          <p className="view-post__desc">{data?.title}</p>
        </div>

        <div className="view-post__row">
          <p className="view-post__title">Date updated:</p>
          <p className="view-post__desc">{formatDate(data?.updated_at)}</p>
        </div>

        <div className="view-post__row view-post__row--grid">
          <div className="view-post__col">
            <p className="view-post__title">Longitude</p>
            <p className="view-post__desc">{data?.long}</p>
          </div>

          <div className="view-post__col">
            <p className="view-post__title">Latitude</p>
            <p className="view-post__desc">{data?.lat}</p>
          </div>
        </div>

        <div className="view-post__row">
          <img src={data?.image_url} width="100%" height={300} />
        </div>

        <div className="view-post__row">
          <p className="view-post__title">Content:</p>
          <p className="view-post__desc">{data?.content}</p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" className="me-3" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleClose}>
          Edit
        </Button>

        <Button variant="danger" onClick={handleClose}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
