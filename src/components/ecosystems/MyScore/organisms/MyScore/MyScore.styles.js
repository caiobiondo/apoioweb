import styled from 'styled-components';

const grayTitleColor = '#545454';

export const Wrapper = styled.div`
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
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
`;

export const SmallTitle = styled.h3`
  color: ${grayTitleColor};
  font-family: NaturaSans-Bold;
  font-size: 21px;
  font-weight: bold;
  text-align: center;
`;

export const Explanation = styled.div``;

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
`;

export const ScoreStatementWrapper = styled.div`
  margin-top: 47px;
`;

export const DottedSeparator = styled.div`
  background-image: linear-gradient(to right, ${props => props.color} 20%, rgba(0, 0, 0, 0) 0%);
  background-position: bottom;
  background-repeat: repeat-x;
  background-size: 7px 2px;
  height: 1.5px;
  margin: 71px auto 21px;
  width: 90%;
`;

export const ContentWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const PeriodTogglerWrapper = styled.div`
  text-align: center;
`;

export const Switcher = styled.div``;
