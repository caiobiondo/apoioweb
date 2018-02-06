import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { orange100, gray900 } from 'styles/colors';

export const Wrapper = styled.div`
  padding: 25px;
  position: absolute;
  margin-bottom: 40px;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    position: relative;
    margin-top: 40px;
  }
`;

export const PaperWrapper = styled.div`
  > div {
    height: 750px;
    position: relative;

    @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
      height: unset;
    }
  }
`;

export const MagazinePageInnerWrapper = styled.div`
  width: 290px;
  display: inline-block;
  height: auto;
  position: relative;
  float: left;

  @media (min-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    width: 500px;
  }
`;

export const MagazinePageWrapper = styled.div`
  height: auto;
  position: relative;
  float: left;
  display: flex;
  justify-content: center;
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

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
  z-index: 1000;
  cursor: pointer;
  svg {
    fill: ${gray900};
    width: 15px;
    height: 15px;
    opacity: 0.5;
  }
  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: none;
  }
`;
