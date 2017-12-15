import styled from 'styled-components';
import { Responsive } from '@entria/components';

export const OuterWrapper = styled.div`
  text-align: center;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    height: 110px;
    overflow-x: auto;
    position: relative;
    margin: 0 -50px;
  }
`;

export const InnerWrapper = styled.div`
  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    position: absolute;
    left: 0;
    width: 960px;
  }
`;

export const WrapperStyles = {
  textAlign: 'center',
  padding: '9px 20px',
  borderRadius: '10px',
  display: 'inline-block',
  fontFamily: 'Lato-Regular',
  minHeight: '86px',
};

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

export const SelectedCyclePointer = styled.div`
  border: 1px solid #dadada;
  border-bottom: none;
  border-right: none;
  background: white;
  cursor: default;
  pointer-events: none;
  width: 26px;
  height: 26px;

  transform: rotate(45deg);
`;

export const SelectedCyclePointerWrapper = styled.div`
  position: absolute;
  bottom: -23px;
  z-index: 1;
  margin-left: 19px;
`;
