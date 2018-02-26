import styled from 'styled-components';
import { Responsive, getTheme } from '@entria/components';
import { RobotoRegular } from 'styles/typography';
import { gray50, gray125, gray150, gray500 } from 'styles/colors';

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
  color: #333333;
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
