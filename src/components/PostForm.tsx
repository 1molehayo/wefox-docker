import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useScript } from 'usehooks-ts';
import GoogleMapForm from './GoogleMapForm';
import ImageUpload from './ImageUpload';
import IPost from 'models/Post';
import Loader from './Loader';
import { notify } from 'utilities/toaster';
import { PostContext } from 'contexts/Posts';

interface IPostForm {
  data?: IPost;
  show: boolean;
  handleClose: () => void;
}

const PostForm = ({ data, show, handleClose }: IPostForm) => {
  // Load the script asynchronously
  const status = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&libraries=places`,
    {
      removeOnUnmount: false
    }
  );

  const { createPost, updatePosts, updating } = React.useContext(PostContext);

  const [form, setForm] = React.useState<IPost>({
    id: data?.id ?? undefined,
    title: data?.title ?? '',
    content: data?.content ?? '',
    lat: data?.lat ?? '',
    long: data?.long ?? '',
    image_url: data?.image_url ?? ''
  });

  const addEditNew = async () => {
    try {
      // eslint-disable-next-line no-console
      console.log('form data:', form);

      if (data?.id) {
        await updatePosts(form);
        notify({
          type: 'success',
          message: `${data.title} was updated successfully`
        });
        return;
      }

      const newForm = { ...form };
      delete newForm.id;

      await createPost(newForm);
      notify({
        type: 'success',
        message: `${form.title} was created successfully`
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  if (status === 'error') {
    notify({
      type: 'error',
      message: 'There was an error while loading google maps'
    });
  }

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

      <Modal.Body className="position-relative">
        {status === 'loading' && <Loader isLoading fluid />}

        <Form>
          <Form.Group className="mb-3" controlId="postForm">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contentField">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </Form.Group>

          {status === 'ready' && (
            <GoogleMapForm form={form} updateForm={setForm} />
          )}

          <ImageUpload form={form} updateForm={setForm} />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" className="me-3" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={addEditNew}>
          {updating ? 'Loading...' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// AIzaSyA0j8zplBsQeyZYVSk-tCDJx9-VrSinmB8

export default PostForm;
