import styled from 'styled-components';
import { getSolidColor } from 'utils/colors';

export const Wrapper = styled.div`
  color: ${props => getSolidColor(props.color)};
`;
