/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import IPost from 'models/Post';
import GenericObject from 'models/Generic';

interface IImageUpload {
  errors?: GenericObject;
  form: IPost;
  // eslint-disable-next-line no-unused-vars
  setErrors?: (val: GenericObject) => void;
  // eslint-disable-next-line no-unused-vars
  updateForm: (post: any) => void;
}

const ImageUpload = ({ form, errors, setErrors, updateForm }: IImageUpload) => {
  const handleOpenWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUD_PRESET_NAME,
        multiple: false
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any, result: { event: string; info: any }) => {
        const temp = { ...errors };

        if (setErrors) {
          if (error) {
            updateForm((prevState: any) => {
              return { ...prevState, image_url: '' };
            });
            temp.image_url = true;
            setErrors(temp);
            return;
          }

          if (!error && result && result.event === 'success') {
            temp.image_url = false;

            updateForm((prevState: any) => {
              return { ...prevState, image_url: result.info.secure_url };
            });
            setErrors(temp);
          }
        }
      }
    );

    myWidget.open();
  };

  return (
    <Form.Group className="form-file mb-5" controlId="imageField">
      <Form.Label className="form-label">
        Upload Image <span className="color-red">*</span>
      </Form.Label>
      <Button
        id="upload-widget"
        className="form-file__button ms-4"
        onClick={handleOpenWidget}
      >
        Select
      </Button>

      {errors && errors?.image_url && (
        <Form.Control.Feedback type="invalid" className="d-block">
          Please upload an image to proceed!
        </Form.Control.Feedback>
      )}

      {form.image_url && (
        <div className="form-file__preview">
          <img src={form.image_url} alt={form.title} />
        </div>
      )}
    </Form.Group>
  );
};

export default ImageUpload;
