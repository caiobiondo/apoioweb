import styled from 'styled-components';
import { Responsive, getTheme } from '@entria/components';
import { black, white, orange100, gray100 } from 'styles/colors';
import {
  RobotoMedium,
  NaturaRegular,
  fs15,
  fs20,
  fs25,
  fs30,
  fs60,
  fs100,
} from 'styles/typography';

export const Wrapper = styled.div`
  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    position: relative;
    padding: 0px 10px 0px 10px;
  }

  margin-bottom: 24px;
`;

export const Header = styled.h2`
  font-family: ${NaturaRegular};
  font-size: ${fs30};
  font-weight: bold;
  text-align: left;
  color: ${black};
  padding-top: 15px;

  @media (max-height: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: ${fs25};
    padding: 0 0 20px 0;
    margin: 0;
  }
`;

export const StartedCoursesWrapper = styled.div`
  position: relative;
  height: 355px;
  width: 100%;

  @media (max-height: ${Responsive.VIEWPORT.MEDIUM}px) and (max-width: 975px), (max-width: 1024px) {
    height: 195px;
  }

  .slick-slider {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }

  .slick-list {
    height: 100% !important;
  }

  .slick-track {
    height: 100%;
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
          border: 1px solid ${orange100};
        }
      }

      &.slick-active button:before {
        background-color: ${orange100};
      }
    }
  }
`;

export const StartedCourseInfo = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 30px;
  cursor: pointer;
  z-index: 1;
`;

export const StartedCourseTitle = styled.h2`
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

  @media (max-width: 1024px) {
    margin: -15px 0px 40px 47px;
    font-size: ${fs20};
  }
`;

export const StartedCourseCategoryTitle = styled.span`
  font-family: ${RobotoMedium};
  font-size: 20.5px;
  font-weight: normal;
  text-align: left;
  text-transform: uppercase;
  color: ${white};
  margin-left: 84px;
  text-shadow: 0px 2.5px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    margin-left: 46px;
    font-size: ${fs15};
  }
`;

/* eslint-disable no-confusing-arrow */
export const StartedCoursesThumbnail = styled.div`
  position: relative;
  background-color: ${gray100};
  background-image: url(${props => (props.imageUrl ? props.imageUrl : '')});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;

  &:before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;
/* eslint-enable no-confusing-arrow */

export const LeftCarouselArrow = styled.span`
  position: absolute;
  font-size: ${fs100};
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 2;
  top: 50%;
  bottom: 50%;
  text-shadow: 1px 0px 4px black;
  cursor: pointer;
  margin-left: 23px;

  @media (max-width: 1024px) {
    font-size: ${fs60};
  }
`;

export const RightCarouselArrow = LeftCarouselArrow.extend`
  right: 23px;
`;
