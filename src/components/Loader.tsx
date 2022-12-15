import React from 'react';
import classnames from 'classnames';

interface ILoader {
  isLoading?: boolean;
  children?: React.ReactNode;
  fullscreen?: boolean;
  fluid?: boolean;
}

const Loader = ({ isLoading, children, fullscreen, fluid }: ILoader) => {
  return (
    <div
      className={classnames('loader', {
        'loader--fullscreen': fullscreen,
        'loader--fluid': fluid
      })}
    >
      {isLoading ? (
        <>
          <div className="overlay" />
          <div className="spin"></div>
        </>
      ) : (
        <div className="child-container">{children}</div>
      )}
    </div>
  );
};

export default React.memo(Loader);
