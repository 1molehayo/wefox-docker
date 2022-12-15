import React from 'react';
import IPost from 'models/Post';
import { Card } from 'react-bootstrap';
import { truncateText } from 'utilities';
import { ReactComponent as BrokenImage } from 'assets/images/svgs/image.svg';

interface IDataCard {
  data: IPost;
  onClick: () => void;
}

const DataCard = ({ data, onClick }: IDataCard) => {
  return (
    <div className="col-md-6 md-lg-4 mb-4">
      <Card className="data-card" onClick={onClick} role="button">
        <div className="data-card__avatar">
          <Card.Img
            variant="top"
            className="card__image"
            src={data.image_url}
          />

          <BrokenImage className="broken-image" />
        </div>

        <Card.Body className="card__body">
          <Card.Title>{truncateText(data.title, 70)}</Card.Title>
          <p className="card__date">{data.updated_at}</p>

          <Card.Text>{truncateText(data.content)}</Card.Text>

          <div className="card__footer">
            <span>
              LONG: <strong>{data.long}</strong>
            </span>
            <span>
              LAT: <strong>{data.lat}</strong>
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DataCard;
