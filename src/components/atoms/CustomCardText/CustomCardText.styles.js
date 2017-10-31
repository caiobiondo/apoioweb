import styled from 'styled-components';
import { getSolidColor } from './utils';

export const Wrapper = styled.div`
  color: ${props => getSolidColor(props.color)};
`;
