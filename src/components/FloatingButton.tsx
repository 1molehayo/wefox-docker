import IPost from 'models/Post';
import React from 'react';
import PostForm from './PostForm';
import { ReactComponent as Add } from 'assets/images/svgs/add.svg';

interface IFloatingButton {
  data?: IPost;
  handleClose: () => void;
}
const FloatingButton = ({ data, handleClose }: IFloatingButton) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => {
    setIsOpen(false);
    handleClose();
  };

  return (
    <>
      <PostForm show={isOpen || !!data} data={data} handleClose={onClose} />
      <button className="floating-button" onClick={() => setIsOpen(true)}>
        <Add width={24} height={24} />
      </button>
    </>
  );
};

export default FloatingButton;
