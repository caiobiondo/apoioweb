import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CertificateWrapper,
  CertificateName,
  CertificateImageWrapper,
  CertificateSliderWrapper,
  SliderPercentage,
  SliderWrapper,
  Slider,
  CompletedIconWrapper,
  DownloadCertificateButtonWrapper,
  DownloadCertificateButton,
} from './Certificate.styles';
import Img from 'react-image';
import { Icon, FormButton, Dialog, Modal } from 'natura-ui';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';
import {
  CertificateDownloadQuery,
  CertificateDownloadQueryOptions,
} from './CertificateDownload.data';
import {
  CertificateSendEmailQuery,
  CertificateSendEmailOptions,
} from './CenrtificateSendEmail.data';

import { withApollo } from 'react-apollo';

export class Certificate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      certificateModalOpened: true,
      certificateModalTitle: '',
      courseCompleted: false,
    };
  }

  downloadCertificate = () => {
    const variables = CertificateDownloadQueryOptions.options(this.props).variables;
    this.props.client
      .query({
        query: CertificateDownloadQuery,
        variables,
      })
      .catch(() => {
        return null;
      })
      .then(res => {
        if (res.data && res.data.trainingCertificateDownload) {
          const { downloadUrl } = res.data.trainingCertificateDownload;
          window.open(downloadUrl, '_blank');
        }
      });
  };

  /*
  openModalSendEmail = () => {

  }
  */

  openModalCertificate = () => {
    const actions = [
      <FlatButton
        key="ok"
        label={<FormattedMessage id="ok" />}
        primary={false}
        onClick={this.openModalSendEmail}
      />,
    ];
    return (
      <Dialog
        key="certificateModal"
        title="Teste"
        actions={actions}
        modal={true}
        open={this.state.certificateModalOpened}
        onRequestClose={this.handleClose}
      />
    );
  };

  handleClose = () => {
    this.setState({ certificateModalOpened: false });
  };

  sendCertificate = () => {
    const variables = CertificateSendEmailOptions.options(this.props).variables;
    this.props.client
      .query({
        query: CertificateSendEmailQuery,
        variables,
      })
      .catch(() => {
        return null;
      })
      .then(res => {
        if (res.data && res.data.trainingCertificateSendEmail) {
          const { downloadUrl } = res.data.trainingCertificateSendEmail;
          window.open(downloadUrl, '_blank');
        }
      });
  };

  componentDidMount = () => {
    const { isCompleted } = this.props.certificate;
    this.setState({ courseCompleted: isCompleted });
  };

  render() {
    const { certificate, index } = this.props;
    const percentage = certificate.percentageOfCompletedCourse;

    return (
      <CertificateWrapper index={index}>
        <CertificateImageWrapper>
          <Img src={certificate.thumbnail} />
        </CertificateImageWrapper>
        <CertificateName>{certificate.name}</CertificateName>
        <CertificateSliderWrapper>
          <SliderPercentage>{percentage}%</SliderPercentage>
          <SliderWrapper>
            <Slider percentage={percentage} />
          </SliderWrapper>
          <CompletedIconWrapper completed={this.state.courseCompleted}>
            <Icon file="ico_trophy" />
          </CompletedIconWrapper>
        </CertificateSliderWrapper>
        <DownloadCertificateButtonWrapper>
          {this.state.courseCompleted && (
            <FormButton
              {...DownloadCertificateButton}
              type="button"
              onClick={this.openModalCertificate}
              label={translate('sendCertificate')}
            />
          )}
        </DownloadCertificateButtonWrapper>
      </CertificateWrapper>
    );
  }
}

Certificate.propTypes = {
  certificate: PropTypes.object,
  user: PropTypes.object,
  index: PropTypes.number,
};

export default withApollo(Certificate);
