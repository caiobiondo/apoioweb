import styled from 'styled-components';
import { orange100 } from 'styles/colors';

export const Wrapper = styled.div`
  padding: 25px;
  position: relative;
  margin-bottom: 80px;
`;

export const MagazinePage = styled.img`
  width: 100%;
  min-height: 191px;
  max-height: 540px;
  object-fit: contain;
`;

export const LeftCarouselArrow = styled.span`
  height: 150px;
  position: absolute;
  bottom: 40px;
  font-size: 100px;
  color: ${orange100};
  display: flex;
  align-items: center;
  z-index: 9999;
  top: 250px;
  cursor: pointer;
`;

export const RightCarouselArrow = LeftCarouselArrow.extend`
  right: 25px;
`;
