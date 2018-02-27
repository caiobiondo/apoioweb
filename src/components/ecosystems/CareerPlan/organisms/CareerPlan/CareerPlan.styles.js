import styled from 'styled-components';
import { gray890 } from 'styles/colors';
import { fs32, fs16, RobotoRegular } from 'styles/typography';

export const CareerPlanSection = styled.section`
  position: relative;
`;

export const CareerPlanTitleWrapper = styled.section`
  margin-top: 48px;
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
