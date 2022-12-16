import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import IPost from 'models/Post';
import { formatDate } from 'utilities';
import DeleteObject from 'models/DeleteObject';
import ConfirmationModal from './ConfirmationModal';
import PostForm from './PostForm';

interface IViewModal {
  data?: IPost;
  handleClose: () => void;
}

const ViewModal = ({ data, handleClose }: IViewModal) => {
  const [selectedEditPost, setSelectedEditPost] = React.useState<
    IPost | undefined
  >();

  const [deletePost, setDeletePost] = React.useState<
    DeleteObject | undefined
  >();

  return (
    <>
      <ConfirmationModal
        data={deletePost}
        handleClose={() => setDeletePost(undefined)}
      />

      <PostForm
        show={!!selectedEditPost}
        data={selectedEditPost}
        handleClose={() => setSelectedEditPost(undefined)}
      />

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
          <div className="row">
            <div className="col-12 mb-4">
              <p className="mb-1">
                <small>Title:</small>
              </p>
              <p className="font-medium">{data?.title}</p>
            </div>

            <div className="col-12 mb-4">
              <p className="mb-1">
                <small>Date updated:</small>
              </p>
              <p className="font-medium">{formatDate(data?.updated_at)}</p>
            </div>

            <div className="col-md-6 mb-4">
              <p className="mb-1">
                <small>Longitude</small>
              </p>
              <p className="font-medium">{data?.long}</p>
            </div>

            <div className="col-md-6 mb-4">
              <p className="mb-1">
                <small>Latitude</small>
              </p>
              <p className="font-medium">{data?.lat}</p>
            </div>

            <div className="col-12 mb-4">
              <img src={data?.image_url} width="100%" height={300} />
            </div>

            <div className="col-12 mb-4">
              <p className="mb-1">
                <small>Content:</small>
              </p>
              <p className="font-medium">{data?.content}</p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline" className="me-3" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={() => setSelectedEditPost(data)}>
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              setDeletePost({
                id: data?.id,
                title: data?.title ?? ''
              })
            }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewModal;
