import styled from 'styled-components';
import { getTheme, Responsive } from '@entria/components';

export const ContentWrapper = styled.div`
  margin-bottom: 25px;
  .video-react .video-react-play-progress {
    background: ${getTheme().palette.primary1Color};
  }
`;

export const Html5Wrapper = styled.div`
  position: relative;
  padding-bottom: 70%;
  height: 0;
  width: 100%;
  overflow: hidden;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    padding-bottom: 100vh;
  }

  iframe, object, embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
`;
