import styled from 'styled-components';
import { white, gray100, orange100 } from 'styles/colors';
import {
  fs14,
  fs20,
  fs32,
  fw700,
  NaturaBold,
  RobotoMedium,
  RobotoRegular,
} from 'styles/typography';
import { Responsive } from '@entria/components';

export const TrainingCourseThumbnailWrapper = styled.div`
  display: inline-block;
`;

export const TrainingCourseThumbnail = styled.div`
  position: relative;
  background-color: ${gray100};
  display: inline-block;

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

  > div:first-child {
    display: flex;

    img {
      object-fit: cover;
      height: 500px;
      max-width: 900px;
      border-radius: 4px;
    }

    svg {
      height: 40px;
    }
  }
`;

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
`;

export const TrainingCourseTitle = styled.div`
  font-size: ${fs32};
  font-family: ${NaturaBold};
  font-weight: ${fw700};
  position: relative;
  text-align: center;
  max-width: 500px;
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
  max-width: 500px;
  margin-bottom: 30px;
`;

export const TrainingCourseActions = styled.div`
  flex: 0 1 auto;
  display: flex;
`;

export const TrainingCourseActionButtonWrapper = styled.div`
  button {
    height: 50px !important;
    border-radius: 4px !important;
  }

  svg {
    fill: ${white};
    width: 15px;
    margin-right: 10px;
    margin-left: 40px;
    vertical-align: middle;
  }

  & + & {
    margin-left: 55px;
  }
`;

export const TrainingCourseActionButton = {
  labelStyle: {
    color: white,
    textTransform: 'uppercase',
    fontFamily: RobotoMedium,
    paddingRight: '40px',
    paddingLeft: '0px',
  },
  backgroundColor: orange100,
  hoverColor: orange100,
};

export const TrainingCourseRatingWrapper = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: unset;
  }
`;
