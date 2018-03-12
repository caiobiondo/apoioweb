import styled from 'styled-components';
import { gray890, gray100, orange100 } from 'styles/colors';
import { fs16, fs20, RobotoRegular, RobotoLight } from 'styles/typography';
import { screenMd } from 'styles/spacing';

export const Header = styled.div`
  margin: 40px 0 25px;

  @media screen and (max-width: ${screenMd}) {
    margin: 40px 0 25px;
  }
`;

export const BackButtonWrapper = styled.div`
  > a {
    cursor: pointer;
    position: relative;
    text-decoration: none;
  }
`;

export const BackButtonText = styled.span`
  color: ${gray890};
  font-family: ${RobotoLight};
  font-size: ${fs20};
  font-weight: ${fs16};
  padding-left: 50px;
`;

export const BackButtonIcon = styled.span`
  left: 0;
  position: absolute;
  top: -5px;
  width: 20px;

  svg {
    fill: ${orange100};
  }
`;

export const CategoryPercentageWrapper = styled.div`
  position: relative;
`;

export const CategoryPercentageLabel = styled.div`
  color: ${gray890};
  display: inline-block;
  font-family: ${RobotoRegular};
  font-size: 16px;
  margin: 5px 25px 0 0;

  @media screen and (max-width: ${screenMd}) {
    margin-top: 40px;
  }
`;

export const CategoryPercentageBar = styled.div`
  background: ${gray100};
  border-radius: 4px;
  display: inline-block;
  height: 9px;
  overflow: hidden;
  position: relative;
  width: 350px;

  &:after {
    background: ${orange100};
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    position: absolute;
    right: ${props => 100 - props.completedPercentage}%;
    top: 0;
  }

  @media screen and (max-width: ${screenMd}) {
    width: 320px;
  }
`;

export const BannerWrapper = styled.div`
  margin-top: 40px;

  @media screen and (max-width: ${screenMd}) {
    margin-top: 20px;
  }
`;

export const Banner = styled.div`
  background: url(${props => props.thumbnail}) center / cover no-repeat;
  height: 345px;
  position: relative;
`;
