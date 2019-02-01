import styled from 'styled-components';
import { Responsive, getTheme } from '@entria/components';
import { RobotoRegular, NaturaScript, NaturaBold, fs25 } from 'styles/typography';
import {
  gray50,
  gray125,
  gray150,
  gray500,
  gray890,
  brownPod,
  gray700,
  black,
  lightningYellow,
} from 'styles/colors';

export const CertificateWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 125px;
  padding: 10px;
  padding-right: 25px;

  background: ${props => {
    return props.index % 2 ? `${gray50}` : 'white';
  }};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-wrap: wrap;
  }
`;

export const CertificateName = styled.div`
  color: ${gray890};
  font-weight: bold;
  font-size: 18px;
  width: 300px;
  padding: 0 15px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 14px;
    width: 200px;
    padding: 0;
  }
`;

export const CertificateImageWrapper = styled.div`
  display: flex;
  padding: 0 15px;

  img {
    margin: 0;
    width: 16px;
    height: 16px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    padding-left: 0;
  }
`;

export const CertificateSliderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${getTheme().palette.primary1Color};
  padding-right: 50px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: 10px 0 0 0;
  }
`;

export const SliderPercentage = styled.div`
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

export const TextCongratulate = styled.p`
  width: 512px;
  height: 100px;
  font-family: ${NaturaScript};
  font-size: 47.9px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.91;
  letter-spacing: normal;
  text-align: center;
  color: ${brownPod};
`;

export const InputMail = styled.input`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  padding: 10px;
  width: 80%;
`;

export const SliderWrapper = styled.div`
  height: 6px;
  flex-grow: 2;
  margin: 0 15px;
  border-radius: 3px;
  background-color: ${gray500};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: 0 5px 0 5px;
  }
`;

export const Slider = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${getTheme().palette.primary1Color};
  border-radius: 3px;
`;

export const CompletedIconWrapper = styled.div`
  svg {
    fill: ${({ completed }) => {
      return completed ? `${getTheme().palette.primary1Color}` : `${gray150}`;
    }};
    width: 13px;
  }
`;

export const DownloadCertificateButtonWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  margin-left: 10px;
  min-width: 190px;

  div {
    background-color: transparent !important;
  }

  button,
  > div,
  > div > div {
    width: 100%;
    background-color: transparent;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-left: 0;
    min-width: 100%;

    > div > button > div {
      flex: 1 1 auto;
    }
  }
`;

export const DownloadCertificateButton = {
  labelStyle: {
    color: getTheme().palette.primary1Color,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: RobotoRegular,
  },
  height: 54,
  backgroundColor: 'transparent',
  buttonStyle: { border: `1px solid ${gray125}` },
};

export const TextMessageModal = styled.div`
  width: 575.5px;
  height: 44.5px;
  font-family: ${RobotoRegular};
  font-size: 15.5px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.68;
  letter-spacing: normal;
  text-align: left;
  color: ${gray700};
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${RobotoRegular};
`;

export const DialogTitleWrapper = styled.div`
  align-items: center;
  display: inline-flex;
`;

export const SuccessModalTitle = {
  fontFamily: NaturaBold,
  fontSize: fs25,
};

export const DialogTitle = styled.h3`
  width: auto;
  height: 24.5px;
  opacity: 0.87;
  font-family: ${NaturaBold};
  font-size: 24.5px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  margin-bottom: 30px !important;
  color: ${black} !important;
`;

export const IconWrapper = styled.div`
  margin-left: 39px;
  margin-top: 46px;
  svg {
    width: 69.7px;
    height: 60.3px;
    fill: ${brownPod};
  }

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    svg {
      height: 71.5px;
      width: 83px;
    }
  }
`;

export const IconWrapperCap = styled.div`
  svg {
    width: 25px;
    height: 25px;
    fill: ${lightningYellow};
    margin-right: 15px;
    margin-left: 15px;
  }

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    svg {
      height: 71.5px;
      width: 83px;
    }
  }
`;

export const IconWrapperCircle = styled.div`
  width: 146px;
  height: 146px;
  border-radius: 73px;
  border: solid 2px ${lightningYellow};
  margin: 0 auto;
  margin-bottom: -62px;
`;

export const ModalTextContentWrapper = styled.div`
  text-align: -webkit-center;
`;

export const EmailTextFieldWrapper = styled.div`
  height: auto;
`;

export const EmailBolder = styled.b;
