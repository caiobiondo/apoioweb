import styled from 'styled-components';
import { getGradientColor } from './utils';

export const Wrapper = styled.div`
  margin: 15px 0px;
  width: 100%;
`;

export const Border = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 4px;
  background: ${props => getGradientColor(props.color)};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
