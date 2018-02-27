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
import { Icon, FormButton } from 'natura-ui';
import { translate } from 'locale';

class Certificate extends Component {
  state = {
    courseCompleted: false,
  };

  downloadCertificate = () => {
    const { downloadUrl } = this.props.certificate;
    window.open(downloadUrl, '_blank');
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
              type="submit"
              onClick={this.downloadCertificate}
              label={translate('downloadCertificate')}
            />
          )}
        </DownloadCertificateButtonWrapper>
      </CertificateWrapper>
    );
  }
}

Certificate.propTypes = {
  certificate: PropTypes.object,
  index: PropTypes.number,
};

export default Certificate;
