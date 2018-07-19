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

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgb(248, 248, 248, 0.7);
  z-index: 2;
`;

export const LoadingWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  position: relative;

  > div {
    position: fixed !important;
    left: auto !important;
    right: auto !important;
    width: auto !important;
  }
`;
