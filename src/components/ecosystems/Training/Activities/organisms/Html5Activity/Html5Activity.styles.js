import styled from 'styled-components';
import { getTheme, Responsive } from '@entria/components';
import { white, gray100, gray150, gray450, orange100 } from 'styles/colors';
import {
  fs14,
  fs20,
  fs25,
  fs32,
  fw700,
  NaturaBold,
  RobotoMedium,
  RobotoRegular,
} from 'styles/typography';

export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CourseViewFeedbackModalTitle = {
  fontFamily: NaturaBold,
  fontSize: fs25,
};

export const CourseViewFeedbackModalAction = {
  fontFamily: RobotoRegular,
};

export const TrainingCourseThumbnailWrapper = styled.div`
  display: inline-block;
  margin-bottom: 30px;
`;

/* eslint-disable no-confusing-arrow */
export const TrainingCourseThumbnail = styled.div`
  position: relative;
  background-color: ${gray100};
  background-image: url(${props => (props.imageUrl ? props.imageUrl : '')});
  background-repeat: no-repeat;
  background-size: cover;
  height: 560px;
  border-radius: 4px;

  &:before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
    border-radius: 4px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    height: 250px;
  }
`;
/* eslint-enable no-confusing-arrow */

export const TrainingCourseThumbnailDescriptionWrapper = styled.div`
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${white};
  padding: 15px;
`;

export const TrainingCourseUnavailableTitle = styled.div`
  font-size: ${fs32};
  font-family: ${NaturaBold};
  font-weight: ${fw700};
  position: relative;
  text-align: center;
  margin-bottom: 30px;
  flex: 0 1 auto;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: ${fs20};
  }
`;

export const TrainingCourseTitle = styled.div`
  font-size: ${fs32};
  font-family: ${NaturaBold};
  font-weight: ${fw700};
  position: relative;
  text-align: center;
  margin-bottom: 30px;
  flex: 0 1 auto;

  &:after {
    position: absolute;
    left: 45%;
    bottom: -10px;
    content: '';
    width: 35px;
    height: 2.5px;
    background: ${orange100};
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: ${fs20};
  }
`;

export const TrainingCourseDescription = styled.div`
  font-size: ${fs14};
  font-family: ${RobotoRegular};
  text-align: center;
`;

export const TrainingCourseActions = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
    margin-top: 20px;
  }
`;

export const TrainingCourseActionButtonWrapper = styled.div`
  margin-right: 55px;
  margin-top: 30px;
  border: 2px solid ${getTheme().palette.primary1Color};

  button {
    height: 50px !important;
    border-radius: 4px !important;
  }

  svg {
    fill: ${getTheme().palette.primary1Color};
    width: 15px;
    margin-right: 10px;
    margin-left: 40px;
    vertical-align: middle;
  }

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    border: 2px solid ${orange100};
    border-radius: 2.5px;
    margin-right: 0;
    margin-top: 0;

    & + & {
      margin-top: 20px;
    }

    svg {
      fill: ${orange100};
    }
  }
`;

export const FinishModalTitle = {
  fontFamily: NaturaBold,
  fontSize: fs25,
};

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${RobotoRegular};
`;

export const TrainingCourseActionButton = {
  labelStyle: {
    color: getTheme().palette.primary1Color,
    textTransform: 'uppercase',
    fontFamily: RobotoRegular,
  },
  backgroundColor: gray450,
  hoverColor: gray450,
};

export const TrainingCourseActionButtonMobile = {
  labelStyle: {
    color: orange100,
    textTransform: 'uppercase',
    fontFamily: RobotoMedium,
    paddingRight: '40px',
    paddingLeft: '0px',
  },
  backgroundColor: gray450,
  hoverColor: gray450,
};

export const TrainingCourseRatingWrapper = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: unset;
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 25px;
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
}
`;
