import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
`;

export const SignSeparator = styled.div`
  font-family: Lato-Regular;
  font-size: 17.5px;
  font-weight: 300;
  text-align: center;
  color: #8d8d8d;
`;

export const Block = styled.div`
  display: inline-block;
  margin: 0 35px;
`;

export const IconWrapper = styled.div`
  display: inline-block;
  margin-right: 7.5px;
  overflow: hidden;
  svg {
    height: 12.5px;
    width: 13px;
    fill: ${props => props.color};
  }
`;

export const MergedIconWrapper = styled.div`
  display: inline-block;
`;
