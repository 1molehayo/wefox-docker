import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section id="notfound">
      <Container>
        <div className="notfound__inner">
          <h1>404</h1>
          <p>Page not found</p>

          <Link to="/" className="btn btn-primary">
            Go back home
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
