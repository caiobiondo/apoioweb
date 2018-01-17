import styled from 'styled-components';
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
  position: relative;
  overflow-x: hidden;
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
    img {
      transform: scale(1.1);
      opacity: 0.2;
    }
  }
`;

export const MagazineCover = styled.img`
  width: 100%;
  min-height: 191px;
  max-height: 291px;
  object-fit: contain;
  padding: 0 7.5px;
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

export const RightCarouselArrow = LeftCarouselArrow.extend`
  right: 25px;
`;
