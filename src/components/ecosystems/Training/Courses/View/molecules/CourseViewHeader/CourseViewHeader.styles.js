import styled from 'styled-components';
import { gray890, orange100 } from 'styles/colors';
import { fs15, fs16, fs20, RobotoLight } from 'styles/typography';
import { screenMd } from 'styles/spacing';
import { Responsive } from '@entria/components';

export const Header = styled.div`
  margin: 40px 0 25px;

  @media screen and (max-width: ${screenMd}) {
    margin: 40px 0 25px;
  }
`;

export const BackButtonWrapper = styled.div`
  > a {
    cursor: pointer;
    position: relative;
    text-decoration: none;
  }
`;

export const BackButtonText = styled.span`
  color: ${gray890};
  font-family: ${RobotoLight};
  font-size: ${fs20};
  font-weight: ${fs16};
  padding-left: 50px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: ${fs15};
  }
`;

export const BackButtonIcon = styled.span`
  left: 0;
  position: absolute;
  top: -5px;
  width: 20px;

  svg {
    fill: ${orange100};
  }
`;
