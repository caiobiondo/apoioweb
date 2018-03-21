import styled from 'styled-components';
import { Responsive, getTheme } from '@entria/components';
import { black, white } from 'styles/colors';
import { RobotoMedium, NaturaRegular } from 'styles/typography';

export const Wrapper = styled.div`
  margin-top: 52px;
  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    position: relative;
    padding: 0px 10px 0px 10px;
  }
`;

export const Header = styled.h2`
  font-family: ${NaturaRegular};
  font-size: 30px;
  font-weight: bold;
  line-height: 0.4;
  text-align: left;
  color: ${black};
  margin-bottom: 28px;

  @media (max-height: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 25px;
    padding: 20px;
    margin-bottom: -22px;
  }
`;

export const StartedCoursesWrapper = styled.div`
  position: relative;
  height: 400px;
  width: 100%;

  @media (max-height: ${Responsive.VIEWPORT.MEDIUM}px) {
    height: 240px;
  }

  > div {
    position: absolute;
    width: 100%;
    overflow-x: hidden;
  }

  .slick-list {
    height: 100% !important;
  }

  .slick-slide {
    display: inline-block;
  }

  .slick-dots {
    position: absolute;
    bottom: 20px;
    display: flex !important;
    left: 0px;
    right: 0px;
    align-items: center;
    justify-content: center;

    list-style: none;

    li {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 5px;
      padding: 0;
      cursor: pointer;

      button {
        font-size: 0;
        line-height: 0;
        display: block;
        width: 20px;
        height: 20px;
        padding: 5px;
        cursor: pointer;
        color: transparent;
        border: 0;
        outline: none;
        background: transparent;

        &:before {
          position: absolute;
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: white;
          border: 1px solid #f3971f;
        }
      }

      &.slick-active button:before {
        background-color: #f3971f;
      }
    }
  }
`;

export const CourseInCoverInfo = styled.div`
  position: absolute;
  top: 0;
  bottom: 5px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px;
  cursor: pointer;
`;

export const CourseTitle = styled.h2`
  font-family: ${NaturaRegular};
  font-size: 38.8px;
  font-weight: bold;
  line-height: 1.25;
  text-align: left;
  color: ${white};
  margin: -87px 0px 40px 85px;
  text-shadow: 0px 2.5px 15px rgba(0, 0, 0, 0.1);
  position: relative;

  &:after {
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 2px;
    background: ${getTheme().palette.primary1Color};
    content: '';
    position: absolute;
  }

  @media (max-height: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: -30px 0px 40px 47px
    font-size: 20px;
  }

  @media (max-width: 481px) {
    margin: -10px 0px 40px 47px;
    font-size: 20px;
  }
`;

export const CourseCategoryTitle = styled.span`
  font-family: ${RobotoMedium};
  font-size: 20.5px;
  font-weight: normal;
  line-height: 0.71;
  text-align: left;
  text-transform: uppercase;
  color: ${white};
  margin-left: 84px;
  text-shadow: 0px 2.5px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 481px) {
    margin-left: 46px;
    font-size: 10px;
  }
`;

export const StartedCoursesThumbnail = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 28px;

  @media (max-height: ${Responsive.VIEWPORT.MEDIUM}px) {
    height: 350px
  }

    img {
      width: 100%;
      object-fit: cover;
      height: 350px;

      @media (max-height: ${Responsive.VIEWPORT.MEDIUM}px) {
        height: 195px
      }
    }

  }
`;

export const LeftCarouselArrow = styled.span`
  position: absolute;
  font-size: 100px;
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 2;
  top: 38%;
  text-shadow: 1px 0px 4px black;
  cursor: pointer;
  margin-left: 23px;

  @media (max-height: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 70px;
    top: 38%;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 70px;
    top: 38%;
  }
`;

export const RightCarouselArrow = LeftCarouselArrow.extend`
  right: 23px;
`;
