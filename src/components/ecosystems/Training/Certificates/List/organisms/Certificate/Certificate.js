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
import { Icon, FormButton, Dialog } from 'natura-ui';
import FlatButton from 'material-ui/FlatButton';
import { FormattedMessage } from 'react-intl';
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
import { Form, Field } from 'formik';

export class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateModalOpened: false,
      certificateSendEmailModalOpened: false,
      certificateModalTitle: '',
      courseCompleted: false,
      primaryNameUser: props.user.nomeCompleto,
      categoryName: props.certificate.name,
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

  openModalCertificate = () => {
    const actions = [
      <FlatButton
        key="close"
        label={<FormattedMessage id="close" />}
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        key="ok"
        label={<FormattedMessage id="sendCertificate" />}
        primary={true}
        onClick={this.handleClickOpenSendEmail}
      />,
    ];
    return (
      <Dialog
        key="certificateModal"
        title={'Categoria ' + this.state.categoryName + ' concluido com sucesso'}
        actions={actions}
        modal={false}
        open={this.state.certificateModalOpened}
        onRequestClose={this.handleClose}
      >
        <div>
          <p>Parabéns, {this.state.primaryNameUser}, você concluiu mais uma etapa!</p>
          <p>
            O dowload do seu certificado irá iniciar em instantes. Caso queira, poderá enviá-lo por
            e-mail clicando no botão abaixo.
          </p>
        </div>
      </Dialog>
    );
  };

  openModalSendEmail = () => {
    const actions = [
      <FlatButton
        key="close"
        label={<FormattedMessage id="close" />}
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        key="ok"
        label={<FormattedMessage id="ok" />}
        primary={true}
        onClick={this.sendCertificate}
      />,
    ];
    return (
      <Dialog
        key="certificateSendEmailModal"
        title={'Por Favor Digite seu e-mail'}
        actions={actions}
        modal={false}
        open={this.state.certificateSendEmailModalOpened}
        onRequestClose={this.handleClickCloseSendEmail}
      >
        <p>input</p>
      </Dialog>
    );
  };

  sendCertificate = () => {
    const variables = CertificateSendEmailOptions.options(this.props).variables;
    this.props.client
      .mutate({
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

  handleClickOpen = () => {
    this.setState({ certificateModalOpened: true });
  };

  handleClickOpenSendEmail = () => {
    this.setState({ certificateModalOpened: false });
    this.setState({ certificateSendEmailModalOpened: true });
  };

  handleClickCloseSendEmail = () => {
    this.setState({ certificateSendEmailModalOpened: false });
  };

  handleClose = () => {
    this.setState({ certificateModalOpened: false });
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
              onClick={this.handleClickOpen}
              label={translate('sendCertificate')}
            />
          )}
          {this.openModalCertificate()}
          {this.openModalSendEmail()}
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
