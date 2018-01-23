import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium } from 'styles/spacing';
import { orange100, gray700 } from 'styles/colors';
import { NaturaRegular, RobotoLight, RobotoRegular, RobotoMedium } from 'styles/typography';

export const CurrentMagazineWrapper = styled.div`
  padding: ${spMedium};
`;

export const CurrentMagazineHeader = styled.h2`
  font-family: ${RobotoLight};
  font-size: 21px;
  font-weight: 300;
  line-height: 1.19;
  text-align: left;
  color: ${orange100};
`;

export const CurrentMagazineInfoWrapper = styled.div`
  display: flex;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const CurrentMagazineInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  padding-left: 62.5px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: block;
    padding: 20px;
  }
`;

export const CurrentMagazineCover = styled.img`
  width: 325.5px;
  height: 444px;
  object-fit: contain;
  box-shadow: 1.6px 1.9px 7.5px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    width: 50%;
    height: auto;
    align-self: center;
  }
`;

export const CurrentMagazinePeriod = styled.span`
  font-family: ${RobotoMedium};
  font-size: 12.7px;
  font-weight: bold;
  line-height: 0.71;
  text-align: left;
  text-transform: uppercase;
  color: ${gray700};
`;

export const CurrentMagazineTitle = styled.h3`
  font-family: ${NaturaRegular};
  font-size: 26.6px;
  font-weight: bold;
  line-height: 1.18;
  text-align: left;
  color: ${orange100};
  margin: 10.5px 0 0 0;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
`;

export const CurrentMagazineDescription = styled.p`
  font-family: ${RobotoRegular};
  font-size: 19.5px;
  line-height: 1.28;
  text-align: left;
  color: ${gray700};
  padding: 25px 0;
  margin: 0;

  p {
    margin: 0;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 13px;
    padding: 10px 0;
    text-align: center;
  }
`;

export const CurrentMagazineTax = styled.p`
  font-family: ${RobotoRegular};
  font-size: 10px;
  line-height: 1.25;
  text-align: left;
  color: ${gray700};
  margin: 0;
`;

export const CurrentMagazineTaxInfoTitle = CurrentMagazineTax.extend`
  font-size: 11.5px;
  line-height: 2.17;
  padding-bottom: 10px;

  a {
    color: ${gray700};
    font-family: ${RobotoMedium};
    font-weight: bold;
    text-decoration: none;
  }
`;

export const CurrentMagazineTaxInfoDescription = CurrentMagazineTax.extend`
  font-size: 11.5px;
  line-height: 2.17;
`;

export const ButtonWrapper = styled.div`
  flex: 0 1 auto;

  svg {
    fill: ${orange100};
    width: 13px;
    padding-left: 16px;
  }

  span {
    font-family: ${RobotoRegular};
    font-size: 16.9px;
    font-weight: 500;
    line-height: 1.28;
    text-align: left;
    color: ${orange100};
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    align-items: center;
    margin-top: 5px;

    button {
      width: 100%;
    }
  }
`;

export const CurrentMagazineTaxWrapper = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: none;
  }
`;

export const CurrentMagazineAdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    ${props => {
      return props.opened ? 'height: auto; opacity: 1;' : 'height: 0; opacity: 0;';
    }};
  }
`;

export const CurrentMagazineSeeMore = styled.div`
  display: none;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: block;
    margin: 10px 0;
  }
`;
