import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { orange100 } from 'styles/colors';

export const Wrapper = styled.div`
  padding: 25px;
  position: relative;
  margin-bottom: 40px;
  overflow-x: hidden;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-top: 40px;
  }
`;

export const MagazinePage = styled.img`
  width: 100%;
  min-height: 191px;
  object-fit: contain;
`;

export const MagazinePageWhite = styled.div`
  width: 100%;
  min-height: 191px;
  object-fit: contain;
  display: inline-block;
`;

export const LeftCarouselArrow = styled.span`
  height: 80%;
  position: absolute;
  bottom: 40px;
  font-size: 100px;
  color: ${orange100};
  display: flex !important;
  align-items: center;
  z-index: 9999;
  top: 20%;
  cursor: pointer;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 50px;
    left: 0;
    padding: 0 1%;
    background: #fff;
  }
`;

export const RightCarouselArrow = LeftCarouselArrow.extend`
  right: 25px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    right: 0;
    left: auto;
  }
`;
