import styled from 'styled-components';

export const CenterWrapper = styled.div`
  text-align: center;
`;

export const WrapperStyles = {
  textAlign: 'center',
  padding: '9px 20px',
  borderRadius: '10px',
  display: 'inline-block',
  fontFamily: 'Lato-Regular',
  minHeight: '86px',
  width: '100%',
};

export const PeriodSwitcherStyles = {
  borderRadius: '10px',
  color: 'rgba(84, 84, 84, 0.4)',
  height: '30px',
  display: 'inline-block',
  marginTop: '27px',
  marginBottom: '45px',
};

export const PeriodSwitcherButton = styled.a`
  font-size: 13.3px;
  line-height: 30px;
  display: inline-block;
  width: 133px;
  font-family: Lato-Regular;
  border-radius: 10px;
`;

export const PeriodSwitcherActiveButton = PeriodSwitcherButton.extend`
  background-color: #444;
  color: #fff;
`;

export const CycleButton = styled.a`
  border-radius: 10px;
  display: inline-block;
  padding: 12px 0;
  width: 66px;
  text-align: center;
  margin-left: 10px;
  color: ${props => props.color};
  background-color: ${props => props.background};
  cursor: pointer;
`;

export const LabelsBlock = styled.a`
  display: inline-block;
  padding: 12px 20px;
  text-align: center;
  font-size: 11.6px;
`;

export const LineBreak = styled.div`
  margin-top: 15px;
`;

export const CycleNumber = styled.span`
  font-size: 13.9px;
`;

export const CycleText = styled.span`
  font-size: 8.4px;
`;

export const IconWrapper = styled.div`
  display: inline-block;
  margin-right: 6.5px;
  position: relative;
  top: -1px;
  svg {
    height: 7px;
    width: 7px;
    fill: ${props => props.color};
  }
`;
