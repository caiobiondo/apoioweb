import styled, { css } from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium } from 'styles/spacing';

export const Full = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    top: 0;
    left: ${spMedium};
    right: ${spMedium};
    bottom: 0;
  }
`;

export const Center = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoadingWrapperStyle = styled.dev`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
