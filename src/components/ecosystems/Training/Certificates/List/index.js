import React, { Component } from 'react';
import CertificateList from './organisms/CertificateList';
import { Main } from './index.styles';

class CertificateWrapper extends Component {
  render() {
    return (
      <Main>
        <CertificateList />
      </Main>
    );
  }
}

export default CertificateWrapper;
