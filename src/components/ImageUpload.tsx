import React from 'react';
import { Button, Form } from 'react-bootstrap';
import IPost from 'models/Post';

interface IImageUpload {
  form: IPost;
  updateForm: React.Dispatch<React.SetStateAction<IPost>>;
}

const ImageUpload = ({ form, updateForm }: IImageUpload) => {
  const handleOpenWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUD_PRESET_NAME,
        multiple: false
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any, result: { event: string; info: any }) => {
        if (!error && result && result.event === 'success') {
          updateForm({
            ...form,
            image_url: result.info.secure_url
          });
        }
      }
    );

    myWidget.open();
  };

  return (
    <Form.Group className="form-file mb-5" controlId="imageField">
      <Form.Label className="form-label">Upload Image</Form.Label>
      <Button
        id="upload-widget"
        className="form-file__button ms-4"
        onClick={handleOpenWidget}
      >
        Select
      </Button>

      {form.image_url && (
        <div className="form-file__preview">
          <img src={form.image_url} alt={form.title} />
        </div>
      )}
    </Form.Group>
  );
};

export default ImageUpload;
