import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { fw300, fs15 } from 'styles/typography';

const grayTitleColor = '#545454';

export const Wrapper = styled.div`
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  padding: 15px;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    padding: 25px;
  }
`;

export const PageTitle = styled.h1`
  color: #f3971f;
  font-family: Roboto-Light;
  font-size: 21px;
  font-weight: 300;
  line-height: 1.19;
  text-align: left;
`;

export const BigTitle = styled.h2`
  color: ${grayTitleColor};
  font-size: 27.5px;
  text-align: center;
  font-weight: ${fw300};
`;

export const SmallTitle = styled.h3`
  color: ${grayTitleColor};
  font-family: NaturaSans-Bold;
  font-size: 21px;
  font-weight: bold;
  text-align: center;
`;

export const Explanation = styled.div`
  font-family: Roboto-Light;
  font-size: ${fs15};
  font-weight: ${fw300};
`;

export const BarSeparator = styled.div`
  border: 2.5px solid ${props => props.color};
  margin: 71px auto 21px;
  width: 42px;
`;

export const LevelListWrapper = styled.div`
  margin-top: 20px;
  position: absolute;
  right: -70px;
  display: none;
`;

export const ScoreProgressWrapper = styled.div`
  margin-top: 53px;
  position: relative;

  &:hover ${LevelListWrapper} {
    display: block;
  }

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    margin-right: -20%;
    margin-left: -20%;
  }
`;

export const ScoreStatementWrapper = styled.div`
  margin-top: 47px;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    margin-top: 0;
  }
`;

export const DottedSeparator = styled.div`
  background-image: linear-gradient(to right, ${props => props.color} 20%, rgba(0, 0, 0, 0) 0%);
  background-position: bottom;
  background-repeat: repeat-x;
  background-size: 7px 2px;
  height: 1.5px;
  margin: 71px auto 21px;
  width: 90%;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    margin-left: -20%;
    margin-right: -20%;
    width: auto;
  }
`;

export const ContentWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const PeriodTogglerWrapper = styled.div`
  width: 265px;
  margin: 0 auto;
`;

export const Switcher = styled.div``;
