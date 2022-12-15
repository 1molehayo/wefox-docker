import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface ILayout {
  children?: React.ReactNode;
}

export default function Layout(WrappedComponent: React.FC) {
  // eslint-disable-next-line react/display-name
  return (props: JSX.IntrinsicAttributes & ILayout) => {
    return (
      <div>
        <Header />

        <main className="page-body">
          <WrappedComponent {...props} />
        </main>

        <Footer />
      </div>
    );
  };
}
