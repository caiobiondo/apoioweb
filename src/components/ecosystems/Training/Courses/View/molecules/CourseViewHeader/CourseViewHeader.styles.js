import styled from 'styled-components';
import { gray890, orange100 } from 'styles/colors';
import { fs15, fs16, fs20, RobotoLight } from 'styles/typography';
import { Responsive } from '@entria/components';

export const Header = styled.div`
  margin: 15px 0 35px;
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
