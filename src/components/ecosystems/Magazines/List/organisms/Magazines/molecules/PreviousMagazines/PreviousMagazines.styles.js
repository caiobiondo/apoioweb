import styled from 'styled-components';
import { orange100 } from 'styles/colors';
import { RobotoLight } from 'styles/typography';

export const Header = styled.h2`
  font-family: ${RobotoLight};
  font-size: 21px;
  font-weight: 300;
  line-height: 1.19;
  text-align: left;
  color: ${orange100};
`;

export const Wrapper = styled.div`
  padding: 25px;
  position: relative;
`;

export const MagazineCover = styled.img`
  width: 140px;
  min-height: 191px;
  max-height: 291px;
  object-fit: contain;
  padding: 0 7.5px;
`;

export const LeftCarouselArrow = styled.span`
  height: 150px;
  position: absolute;
  bottom: 40px;
  font-size: 100px;
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 9999;
  top: 165px;
  text-shadow: 1px 0px 4px black;
  cursor: pointer;
`;

export const RightCarouselArrow = LeftCarouselArrow.extend`
  right: 25px;
`;
