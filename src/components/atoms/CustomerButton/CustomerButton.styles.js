import styled from 'styled-components';
import { white } from 'styles/colors';

export const IconWrapperRemove = styled.div`
  svg {
    transform: rotate(0deg) !important;
  }
`;

export const Wrapper = styled.div`
  svg {
    fill: ${white};
    width: 30px;
    height: 30px;
    transition: all 0.3s ease;
  }

  ${props => {
    return props.remove ? IconWrapperRemove : null;
  }};
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
