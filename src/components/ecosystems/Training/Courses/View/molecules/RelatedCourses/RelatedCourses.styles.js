import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { black } from 'styles/colors';
import { RobotoLight } from 'styles/typography';
import { CategoryCourseWrapper } from '../../../../Categories/List/molecules/CategoryCourse/CategoryCourse.styles';

export const Header = styled.h2`
  font-family: ${RobotoLight};
  font-size: 21px;
  font-weight: bold;
  line-height: 1.19;
  text-align: left;
  color: ${black};
`;

export const Wrapper = styled.div`
  padding: 25px;
  position: absolute;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-bottom: 40px;
    position: relative;
  }
`;

export const PaperWrapper = styled.div`
  > div {
    height: 420px;
    position: relative;

    @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
      height: unset;
    }
  }
`;

export const CourseCoverList = styled.div`
  overflow-x: hidden;
  position: relative;

  ${CategoryCourseWrapper} {
    display: inline-block;
    width: 254px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
    }
  }
`;

export const LeftCarouselArrow = styled.span`
  position: absolute;
  font-size: 100px;
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 9999;
  text-shadow: 1px 0px 4px black;
  cursor: pointer;
`;

export const RightCarouselArrow = LeftCarouselArrow.extend`
  right: 15px;
  top: 2px;
`;

export const paperStyle = {
  boxShadow: 'none',
  backgroundColor: 'transparent',
};

export const CourseWrapper = styled.div`
  display: inline-block;
`;
