import styled from 'styled-components';
import { getTheme } from '@entria/components';

export const ContentWrapper = styled.div`
  margin-bottom: 25px;

  .video-react .video-react-play-progress {
    background: ${getTheme().palette.primary1Color};
  }
`;
