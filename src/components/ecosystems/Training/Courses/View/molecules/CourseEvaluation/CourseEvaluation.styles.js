import styled from 'styled-components';
import {
  RobotoRegular,
  NaturaBold,
  NaturaRegular,
  fs15,
  fs16,
  fs25,
  fw700,
} from 'styles/typography';
import { gray700 } from 'styles/colors';

export const CourseEvaluationModalTitle = {
  fontFamily: NaturaBold,
  fontSize: fs25,
};

export const CourseEvaluationModalAction = {
  fontFamily: RobotoRegular,
  fontWeight: fw700,
};

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TittleWrapper = styled.div`
  font-family: ${RobotoRegular};
  font-size: ${fs16};
  color: ${gray700};
`;

export const RatingWrapper = styled.div`
  div {
    display: flex;
  }
`;

export const RatingStyles = {
  itemIconStyle: {
    width: '18',
    height: '18',
  },
  itemStyle: {
    width: '18',
    height: '18',
    padding: '0',
  },
};

export const WrapperCount = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  font-family: ${NaturaRegular};
  font-size: ${fs15};
`;
