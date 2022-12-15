import React from 'react';
import classnames from 'classnames';

interface INoData {
  className?: string;
  description?: string;
}

const NoData = ({ className, description }: INoData) => {
  return (
    <div className="no-data">
      <div className={classnames('no-data__inner', className)}>
        <span className="no-data__icon" />

        <p>{description || 'No data was found!'}</p>
      </div>
    </div>
  );
};

export default NoData;
