import styled from 'styled-components';
import { gray200 } from 'styles/colors';

export const Wrapper = styled.div`
  svg,
  img {
    width: ${props => props.width};
    height: ${props => props.height};
  }

  svg {
    fill: ${gray200};
  }
`;
