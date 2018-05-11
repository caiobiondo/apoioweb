import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import Certificate from 'components/ecosystems/Training/Certificates/List/organisms/Certificate';
import PageMenu from 'components/ecosystems/Training/atoms/PageMenu/PageMenu';
import { CertificateListQuery, CertificateListQueryOptions } from './CertificateList.data';
import { List, fullContainer } from './CertificateList.styles';
import { Loading, Paper } from 'natura-ui';

export class CertificateList extends Component {
  componentWillReceiveProps({ loading, certificates }) {
    this.notifyLoadFinish(loading, certificates);
  }

  notifyLoadFinish = (loading, certificates) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(
        this.isEmpty(loading, certificates),
        this.isLoading(loading, certificates),
      );
    }
  };

  isLoading = (loading, certificates) => loading && !certificates;

  isEmpty = (loading, certificates) => !loading && (!certificates || certificates.length === 0);

  render() {
    const { certificates } = this.props;

    if (!this.props.certificates && this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (!this.props.certificates || !this.props.certificates.length) {
      return (
        <Paper style={fullContainer}>
          <PageMenu />
          <EmptyList
            icon="ico_list_add"
            titleId="myCertificatesEmptyList"
            descriptionId="certificatesEmptyListDescription"
          />
        </Paper>
      );
    }

    return (
      <Paper>
        <PageMenu />
        <List>
          {certificates.map((certificate, index) => (
            <Certificate
              key={certificate.id}
              index={index}
              certificate={certificate}
              user={this.props.user}
            />
          ))}
        </List>
      </Paper>
    );
  }
}

export default graphql(CertificateListQuery, CertificateListQueryOptions)(CertificateList);
