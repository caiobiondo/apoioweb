import styled from 'styled-components';
import { fs13, fs14, fs20, fs32, fw700, NaturaBold, RobotoRegular } from 'styles/typography';
import { gray890 } from 'styles/colors';
import { Responsive, getTheme } from '@entria/components';

export const TittleWrapper = styled.div`
  font-size: ${fs32};
  font-family: ${NaturaBold};
  font-weight: ${fw700};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: ${fs20};
  }
`;

export const Divider = styled.span`
  &:after {
    width: 35px;
    height: 3px;
    background: ${getTheme().palette.primary1Color};
    content: '';
    position: absolute;
    margin-top: 10px;
    border-radius: 5px;
  }
`;

export const DescriptionWrapper = styled.p`
  font-size: ${fs14};
  font-family: ${RobotoRegular};
  padding: 15px 0;
  text-align: left;
  line-height: 1.5;
  color: ${gray890};
`;
