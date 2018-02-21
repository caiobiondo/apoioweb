import styled from 'styled-components';
import { white, orange100, gray200 } from 'styles/colors';
import { Responsive } from '@entria/components';
import { RobotoRegular, fs18 } from 'styles/typography';

export const TrainingCourseWrapper = styled.div`
  flex: 0 1 auto;
  width: 490px;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
    width: auto;
  }
`;

export const TrainingCoursePaper = styled.div`
  box-shadow: 0px 2.5px 2.4px 0.1px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  min-height: 280px;
  background-color: ${white};
  margin: 10px 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TrainingCourseDescriptionWrapper = styled.div`
  padding: 25px;
  display: flex;
`;

export const TrainingCourseDescription = styled.div`
  display: inline-block;
`;

export const TrainingCourseDescriptionTitle = styled.div`
  display: block;
  font-size: ${fs18};
`;

export const TrainingCourseDescriptionViews = styled.div`
  display: block;
  font-family: ${RobotoRegular};
  color: ${gray200};
  font-size: ${fs18};
`;

export const TrainingCourseThumbnail = styled.div`
  > div {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    img {
      object-fit: cover;
      max-height: 200px;
      width: 100%;
    }
  }
`;

export const TrainingCourseIconWrapper = styled.div`
  margin-right: 15px;

  svg {
    height: 20px;
    fill: ${orange100};
  }
`;
