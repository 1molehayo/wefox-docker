import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  const getToday = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <footer className="footer">
      <Container>
        <small>&copy; {getToday()} wefox Insurance AG</small>
      </Container>
    </footer>
  );
};

export default Footer;
