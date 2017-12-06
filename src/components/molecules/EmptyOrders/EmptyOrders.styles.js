import styled from 'styled-components';

import { gray700, gray150 } from 'styles/colors';
import { fs18, fs28, fw700, NaturaBold, RobotoRegular } from 'styles/typography';
import { spMedium } from 'styles/spacing';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const IconWrapper = styled.div`
  margin-bottom: 31.5px;
  display: inline-block;

  svg {
    height: 81.5px;
    width: 93px;
    fill: ${gray150};
  }
`;

export const Title = styled.div`
  color: ${gray700};
  opacity: 0.8;
  font-family: ${NaturaBold};
  font-size: ${fs28};
  font-weight: ${fw700};
  padding-bottom: ${spMedium};
`;

export const Description = styled.div`
  color: ${gray700};
  opacity: 0.8;
  font-family: ${RobotoRegular};
  font-size: ${fs18};
  text-align: center;
`;
