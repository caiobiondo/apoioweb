import styled from 'styled-components';
import { gray890 } from 'styles/colors';
import { fs32, fs16, RobotoRegular } from 'styles/typography';

export const CareerPlanSection = styled.section`
  position: relative;

  * {
    box-sizing: border-box;
  }
`;

export const CareerPlanTitleWrapper = styled.section`
  margin: 65px 0 48px;
`;

export const CareerPlanTitle = styled.h3`
  color: ${gray890};
  font-size: ${fs32};
  margin-bottom: 30px;
`;

export const CareerPlanDescription = styled.p`
  color: ${gray890};
  font-family: ${RobotoRegular};
  font-size: ${fs16};
`;

export const IndicatorListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  position: relative;
`;
