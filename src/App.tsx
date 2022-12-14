import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from './layouts';

function App() {
  return (
    <section className="home">
      <Container>
        <h1>Home</h1>
      </Container>
    </section>
  );
}

export default Layout(App);
