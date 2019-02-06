import React, { Component } from 'react';
import CertificateList from './organisms/CertificateList';
import { Main } from './index.styles';

class CertificateWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  render() {
    return (
      <Main>
        <CertificateList
          user={this.props.user}
          onLoadFinished={this.onLoadFinished}
          recommended={this.props.recommended}
        />
      </Main>
    );
  }
}

export default CertificateWrapper;
