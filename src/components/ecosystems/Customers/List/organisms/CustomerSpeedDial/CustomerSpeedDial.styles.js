import styled from 'styled-components';
import { white } from 'styles/colors';

export const IconWrapperRemove = styled.div`
  svg {
    transform: rotate(0deg) !important;
  }
`;

export const Wrapper = styled.div`
  svg {
    fill: #000;
    width: 30px;
    height: 30px;
    transition: all 0.3s ease;
  }

  padding-top: 7px;

  ${props => {
    return props.remove ? IconWrapperRemove : null;
  }};
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const IconWrapperClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg) !important;
`;

export const IconWrapperOpen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
