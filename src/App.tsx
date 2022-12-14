import React from 'react';
import { Container } from 'react-bootstrap';
import SubHeader from 'components/SubHeader';
import Layout from './layouts';

function App() {
  return (
    <section className="home">
      <SubHeader title="Posts" />

      <Container></Container>
    </section>
  );
}

export default Layout(App);
