import React from 'react';
import { Container } from 'react-bootstrap';
import { ReactComponent as Background } from 'assets/images/svgs/subheader.svg';

interface ISubHeader {
  title: string;
}

const SubHeader = ({ title }: ISubHeader) => {
  return (
    <div className="section section__subheader">
      <Container>
        <h1>
          {title}
          <span className="color-secondary">.</span>
        </h1>
      </Container>

      <Background className="section__subheader-svg" color="#ffffff" />
    </div>
  );
};

export default SubHeader;
