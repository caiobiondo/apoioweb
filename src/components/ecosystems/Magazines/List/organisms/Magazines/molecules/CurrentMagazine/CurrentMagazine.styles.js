import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium } from 'styles/spacing';
import { orange100, gray700 } from 'styles/colors';
import { NaturaRegular, RobotoLight, RobotoRegular, RobotoMedium } from 'styles/typography';

export const CurrentMagazineWrapper = styled.div`
  padding: ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    padding: 0;
  }
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
`;

export const CurrentMagazineInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 62.5px;
`;

export const CurrentMagazineCover = styled.img`
  width: 325.5px;
  height: 444px;
  object-fit: contain;
  box-shadow: 1.6px 1.9px 7.5px 0 rgba(0, 0, 0, 0.1);
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
`;

export const CurrentMagazineDescription = styled.p`
  font-family: ${RobotoRegular};
  font-size: 19.5px;
  line-height: 1.28;
  text-align: left;
  color: ${gray700};
  padding: 25px 0 25px 0;
  margin: 0;
  align-self: flex-end;
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
`;

export const CurrentMagazineTaxWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
