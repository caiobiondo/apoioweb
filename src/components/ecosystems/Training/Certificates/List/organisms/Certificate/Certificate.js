import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import Img from 'react-image';
import { Icon, FormButton, Dialog } from 'natura-ui';
import FlatButton from 'material-ui/FlatButton';
import DialogContent from 'material-ui';
import { FormattedMessage, injectIntl, FormattedHTMLMessage } from 'react-intl';
import { translate } from 'locale';
import {
  CertificateDownloadQuery,
  CertificateDownloadQueryOptions,
} from './CertificateDownload.data';
import { RobotoRegular } from 'styles/typography';
import { CertificateSendEmail } from './CenrtificateSendEmail.data';
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
  TextCongratulate,
  TextMessageModal,
  DialogTitle,
  IconWrapper,
  IconWrapperCircle,
  IconWrapperCap,
  ModalTextContentWrapper,
  DialogTitleWrapper,
  EmailTextFieldWrapper,
  EmailBolder,
  SuccessModalTitle,
  ContentWrapper,
} from './Certificate.styles';

import { getHeadersFromUser } from '../../../../../../../utils/getUserParams';
import Input from 'natura-ui/dist/components/Form/Input/Input';

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
      finishSendCertificate: false,
      inputValue: '',
      validEmail: true,
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
    const firstName = this.props.user.nomeCompleto.split(' ')[0];

    const actions = [
      <FlatButton
        key="close"
        label={<FormattedMessage id="close" />}
        primary={false}
        onClick={this.handleClose}
        style={{ fontFamily: RobotoRegular }}
      />,
      <FlatButton
        key="ok"
        label={<FormattedMessage id="sendCertificateByEmail" />}
        primary={true}
        onClick={this.handleClickOpenSendEmail}
        style={{ fontFamily: RobotoRegular }}
      />,
    ];

    return (
      <Dialog
        key="certificateModal"
        title={
          <DialogTitleWrapper>
            <IconWrapperCap>
              <Icon file="ico_graduate_cap" />
            </IconWrapperCap>
            <DialogTitle>
              <FormattedMessage id="congratulateTitle" values={{ name: this.state.categoryName }} />
            </DialogTitle>
          </DialogTitleWrapper>
        }
        contentStyle={{ width: '63%', maxWidth: '650px' }}
        actions={actions}
        modal={false}
        open={this.state.certificateModalOpened}
        onRequestClose={this.handleClose}
      >
        <IconWrapperCircle>
          <IconWrapper>
            <Icon file="ico_trophy" />
          </IconWrapper>
        </IconWrapperCircle>

        <ModalTextContentWrapper>
          <TextCongratulate>
            <FormattedMessage id="congratulateCertificate" values={{ name: firstName }} />
          </TextCongratulate>

          <TextMessageModal>
            <FormattedMessage id="infoCongratulateCertificate" />
          </TextMessageModal>
        </ModalTextContentWrapper>
      </Dialog>
    );
  };

  openModalSendEmail = () => {
    const actions = [
      <FlatButton
        key="close"
        label={<FormattedMessage id="close" />}
        primary={false}
        onClick={this.handleClickCloseSendEmail}
      />,
      <FlatButton
        key="ok"
        label={<FormattedMessage id="ok" />}
        primary={true}
        onClick={this.sendCertificate}
      />,
    ];
    return (
      <div>
        <form>
          <Dialog
            key="certificateSendEmailModal"
            title={<DialogTitle>{'Por favor digite seu e-mail'}</DialogTitle>}
            actions={actions}
            modal={false}
            contentStyle={{ height: 'fit-content', width: '100%', maxWidth: '500px' }}
            open={this.state.certificateSendEmailModalOpened}
            onRequestClose={this.handleClickCloseSendEmail}
          >
            <div>
              <EmailTextFieldWrapper>
                <Input
                  name="email"
                  type="text"
                  label="E-mail"
                  value={this.state.inputValue}
                  onChange={this.updateInputValue}
                  onBlur={this.validateEmail}
                  placeholder="Digite o e-mail em que quer receber o certificado."
                  rows={1}
                  style={{ height: '50px' }}
                  errorMessage={this.state.validEmail ? '' : 'Digite um e-mail válido.'}
                />
              </EmailTextFieldWrapper>
            </div>
          </Dialog>
        </form>
      </div>
    );
  };

  openModalSuccess = () => {
    const actions = [
      <FlatButton
        key="ok"
        label={<FormattedMessage id="ok" />}
        primary={true}
        style={{ fontFamily: RobotoRegular }}
        onClick={this.handleSuccessModalClose}
      />,
    ];

    const { categoryName, inputValue } = this.state;

    return (
      <Dialog
        key="certificateModalFinish"
        title={translate('sendMailSuccess')}
        actions={actions}
        modal={false}
        titleStyle={SuccessModalTitle}
        open={this.state.finishSendCertificate}
        onRequestClose={this.handleClose}
      >
        <ContentWrapper>
          <FormattedHTMLMessage
            id="infoSendMailSuccess"
            values={{ categoryName: categoryName, inputValue: inputValue }}
          />
        </ContentWrapper>
      </Dialog>
    );
  };

  updateInputValue = event => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  validateEmail = () => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    this.setState({
      validEmail: expression.test(String(this.state.inputValue).toLowerCase()),
    });
  };

  sendCertificate = async () => {
    this.validateEmail();
    if (!this.state.validEmail) {
      return;
    }

    const {
      ciclo,
      grupo,
      gerenciaDeVendas,
      regiao,
      setor,
      gerenciaMercado,
      papelDaConsultora,
      canal,
      origem,
      sellerId,
    } = getHeadersFromUser(this.props.user);

    try {
      const response = await this.props.mutate({
        query: CertificateSendEmail,
        variables: {
          input: { emails: this.state.inputValue },
          sellerId,
          categoryId: this.props.certificate.id,
          ciclo,
          grupo,
          gerenciaDeVendas,
          regiao,
          setor,
          gerenciaMercado,
          papelDaConsultora,
          canal,
          origem,
        },
      });

      if (!response) {
        this.handleSendEmailError();
        return;
      }

      if (response.error) {
        this.handleSendEmailError();
        return;
      }

      if (!response.data.certificateSendEmail) {
        this.handleSendEmailError();
        return;
      }
      if (response.data.certificateSendEmail.message === 'success') {
        this.setState({ certificateSendEmailModalOpened: false, finishSendCertificate: true });
      }
    } catch (err) {
      console.log('err', err);
      this.handleSendEmailError();
    }
  };

  handleClickOpen = () => {
    this.setState({ certificateModalOpened: true });
  };

  handleClickOpenSendEmail = () => {
    this.setState({ certificateModalOpened: false, certificateSendEmailModalOpened: true });
  };

  handleClickCloseSendEmail = () => {
    this.setState({ certificateSendEmailModalOpened: false });
  };

  handleClose = () => {
    this.setState({ certificateModalOpened: false });
  };

  handleSuccessModalClose = () => {
    this.setState({ finishSendCertificate: false });
  };

  handleFinish = () => {
    this.setState({ finishSendCertificate: true });
  };

  handleSendEmailError = () => {
    this.handleDefaultSendEmail('sendCertificateError');
  };

  handleDefaultSendEmail = msgId => {
    const { formatMessage } = this.props.intl;
    const message = formatMessage({ id: msgId });
    this.setState({
      modalOpened: false,
      feedbackModalOpened: true,
      feedbackModalTitle: message,
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
              onClick={this.handleClickOpen}
              label={translate('sendCertificate')}
            />
          )}
          {this.openModalCertificate()}
          {this.openModalSendEmail()}
          {this.openModalSuccess()}
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

export const CertificateIntl = injectIntl(Certificate);
export default compose(graphql(CertificateSendEmail))(CertificateIntl);
