import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { orange100, gray700 } from 'styles/colors';
import { RobotoLight, RobotoMedium, NaturaRegular } from 'styles/typography';

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

export const MagazineCoverList = styled.div`
  overflow-x: hidden;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const MagazineCoverWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative;
  text-align: center;
  margin: 0 10px;

  &:hover {
    h2,
    span {
      display: block;
    }

    img,
    svg {
      transform: scale(1.1);
      opacity: 0.2;
    }
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-bottom: 40px;

    &:hover {
      h2,
      span {
        display: none;
      }

      img,
      svg {
        transform: scale(1.1);
        opacity: 1;
      }
    }
  }
`;

export const MagazineCover = styled.div`
  width: 100%;
  min-height: 191px;
  max-height: 291px;
  object-fit: contain;
  padding: 10% 0;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    padding: 0;
  }
`;

export const MagazineCoverTitle = styled.h2`
  font-family: ${NaturaRegular};
  font-size: 15px;
  font-weight: bold;
  line-height: 1.25;
  text-align: center;
  color: ${gray700};
  margin: 10.5px 0 0 0;
  display: none;
`;

export const MagazineCoverPeriod = styled.span`
  font-family: ${RobotoMedium};
  font-size: 11px;
  font-weight: bold;
  line-height: 0.71;
  text-align: center;
  text-transform: uppercase;
  color: ${orange100};
  display: none;
`;

export const LeftCarouselArrow = styled.span`
  position: absolute;
  font-size: 100px;
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 9999;
  top: 42%;
  text-shadow: 1px 0px 4px black;
  cursor: pointer;
`;

export const RightCarouselArrow = LeftCarouselArrow.extend`
  right: 25px;
`;

export const MagazineInCoverInfo = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MagazineCoverMobileInfo = styled.h3`
  font-family: ${RobotoMedium};
  font-size: 15px;
  font-weight: bold;
  line-height: 1.25;
  text-align: center;
  color: ${gray700};
  display: none;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: block;
  }
`;
