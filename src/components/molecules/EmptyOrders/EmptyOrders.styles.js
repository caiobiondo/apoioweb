import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray700, gray150 } from 'styles/colors';
import { fs14, fs18, fs20, fs28, fw900, RobotoRegular } from 'styles/typography';
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

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    svg {
      height: 71.5px;
      width: 83px;
    }
  }
`;

export const Title = styled.div`
  color: ${gray700};
  opacity: 0.8;
  font-size: ${fs28};
  font-weight: ${fw900};
  padding-bottom: ${spMedium};
  text-align: center;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    font-size: ${fs20};
  }
`;

export const Description = styled.div`
  color: ${gray700};
  opacity: 0.8;
  font-family: ${RobotoRegular};
  font-size: ${fs18};
  text-align: center;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    font-size: ${fs14};
  }
`;
