import styled from 'styled-components';
import { orange100 } from 'styles/colors';
import { fw600, fs10, fs20 } from 'styles/typography';

export const CategoryCourseWrapper = styled.li`
  height: 140px;
  margin: 0 7px 7px 0;
  overflow: hidden;
  position: relative;
  transition: transform 150ms ease-in;
  cursor: pointer;

  &:hover {
    transform: scale(1, 1.05);
  }

  @media (min-width: 1224px) {
    width: calc(20% - 7px);
  }

  @media (min-width: 900px) and (max-width: 1224px) {
    width: calc(33% - 7px);
  }

  @media (max-width: 900px) {
    width: calc(50% - 7px);
  }
`;

export const CategoryCourseLink = styled.a`
  display: inline-block;
`;

export const CategoryCourseCover = styled.div`
  background: url(${props => props.thumbnail}) center / cover no-repeat;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const CategoryCourseTitleWrapper = styled.div`
  bottom: 0;
  left: 0;
  opacity: 0;
  padding: 15px 20px 15px 45px;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 150ms ease-in;
  z-index: 1;

  &:hover {
    opacity: 1;
  }

  &:before {
    background: black;
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    opacity: 0.4;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  &:after {
    background: ${orange100};
    bottom: 0;
    content: '';
    height: 3px;
    left: 0;
    position: absolute;
    right: ${props => 100 - props.viewedPercentage}%;
  }
`;

export const CategoryCourseTitle = styled.div`
  color: white;
  font-size: ${fs20};
  font-weight: ${fw600};
  line-height: 25px;
`;

export const CategoryCourseDuration = styled.div`
  color: ${orange100};
  font-size: ${fs10};
  line-height: 12px;
`;

export const CategoryCourseIcon = styled.div`
  left: 15px;
  position: absolute;
  top: 15px;
  width: 19px;

  svg {
    fill: ${orange100};
  }
`;
