import IPost from 'models/Post';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IPostForm {
  data?: IPost;
  show: boolean;
  handleClose: () => void;
}

const PostForm = ({ data, show, handleClose }: IPostForm) => {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState<IPost>({
    id: data?.id ?? undefined,
    title: data?.title ?? '',
    content: data?.content ?? '',
    lat: data?.lat ?? '',
    long: data?.long ?? '',
    image_url: data?.image_url ?? ''
  });

  const addEditNew = async () => {
    setLoading(true);
    try {
      console.log(form);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      centered
      size="lg"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>{data ? 'Edit Post' : 'Create Post'}</Modal.Title>
      </Modal.Header>

      <Modal.Body></Modal.Body>

      <Modal.Footer>
        <Button variant="outline" className="me-3" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={addEditNew}>
          {loading ? 'Loading...' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostForm;
