import styled from 'styled-components';
import { getGradientColor } from '../../../utils/colors';

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

export const cardStyle = {
  borderRadius: 3,
  boxShadow: '2px 4px 5px -2px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  padding: 0,
  wordBreak: 'break-word',
};
