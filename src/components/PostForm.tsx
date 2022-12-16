import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useScript } from 'usehooks-ts';
import GoogleMapForm from './GoogleMapForm';
import ImageUpload from './ImageUpload';
import IPost from 'models/Post';
import Loader from './Loader';
import { notify } from 'utilities/toaster';
import { PostContext } from 'contexts/Posts';
import GenericObject from 'models/Generic';
import { checkFieldError } from 'utilities';
import ValidateForm from 'models/ValidateForm';

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
  const [errors, setErrors] = React.useState<GenericObject>();
  const [form, setForm] = React.useState<IPost>({
    id: data?.id ?? undefined,
    title: data?.title ?? '',
    content: data?.content ?? '',
    lat: data?.lat ?? '',
    long: data?.long ?? '',
    image_url: data?.image_url ?? ''
  });

  const loadSavedData = React.useCallback(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  React.useEffect(() => {
    loadSavedData();
  }, [loadSavedData]);

  if (status === 'error') {
    notify({
      type: 'error',
      message: 'There was an error while loading google maps'
    });
  }

  const validateForm = (): boolean => {
    const newForm: ValidateForm = {
      content: form.content,
      image_url: form.image_url,
      lat: form.lat,
      long: form.long,
      title: form.title
    };

    const temp: GenericObject = new Object();

    for (const key in newForm) {
      temp[key] = checkFieldError(key, newForm);
    }

    setErrors(temp);

    return Object.values(temp).every((item: boolean) => item === false);
  };

  const resetFields = () => {
    setForm({
      id: undefined,
      title: '',
      content: '',
      lat: '',
      long: '',
      image_url: ''
    });
  };

  const handleFieldChange = (field: string, newValue: string) => {
    const temp = { ...errors };

    const newForm = { ...form, [field]: newValue };
    temp[field] = checkFieldError(field, newForm);

    setForm(newForm);
    setErrors(temp);
  };

  const addEditNew = async () => {
    if (!validateForm()) {
      notify({
        type: 'error',
        message: 'Please fill in all information to proceed'
      });
      return;
    }

    try {
      const newForm = { ...form };
      delete newForm.updated_at;
      delete newForm.created_at;

      if (data?.id) {
        await updatePosts(newForm);
        notify({
          type: 'success',
          message: `${data.title} was updated successfully`
        });
        return;
      }

      delete newForm.id;

      await createPost(newForm);
      notify({
        type: 'success',
        message: `${form.title} was created successfully`
      });
      resetFields();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const onClose = () => {
    handleClose();
    resetFields();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{data ? 'Edit Post' : 'Create Post'}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="position-relative">
        {status === 'loading' && <Loader isLoading fluid />}

        <Form>
          <Form.Group className="mb-3" controlId="postForm">
            <Form.Label>
              Title <span className="color-red">*</span>
            </Form.Label>
            <Form.Control
              placeholder="Enter title"
              value={form.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              isInvalid={errors && errors?.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contentField">
            <Form.Label>
              Content <span className="color-red">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              value={form.content}
              onChange={(e) => handleFieldChange('content', e.target.value)}
              isInvalid={errors && errors?.content}
            />
          </Form.Group>

          {status === 'ready' && (
            <GoogleMapForm
              form={form}
              errors={errors}
              setErrors={setErrors}
              updateForm={setForm}
            />
          )}

          <ImageUpload
            form={form}
            errors={errors}
            setErrors={setErrors}
            updateForm={setForm}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" className="me-3" onClick={onClose}>
          Close
        </Button>

        <Button
          variant="primary"
          onClick={addEditNew}
          disabled={errors && errors?.length > 0}
        >
          {updating ? 'Loading...' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostForm;
