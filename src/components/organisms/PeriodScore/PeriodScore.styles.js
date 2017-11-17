import styled from 'styled-components';

const grayTitleColor = '#545454';

export const Wrapper = styled.div``;

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
  font-family: NaturaSans-Bold
  font-size: 21px;
  font-weight: bold;
  text-align: center;
`;

export const Explanation = styled.div``;
export const ScoreToNextLevelWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

export const ScoreToNextLevel = styled.span`
  border: 1px solid #707070;
  padding: 4px 10px;
  font-family: Roboto-Regular;
  font-size: 10px;
`;

export const BarSeparator = styled.div`
  border: 2.5px solid ${props => props.color};
  margin: 71px auto 21px;
  width: 42px;
`;

export const ScoreProgressWrapper = styled.div`
  margin-top: 53px;
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
`;

export const Switcher = styled.div``;
