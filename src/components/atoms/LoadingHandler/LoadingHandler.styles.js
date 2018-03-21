import styled, { injectGlobal } from 'styled-components';

export const LoadingContent = styled.div``;
export const LoadingContainer = styled.div`
  min-height: 100px;
  width: 100%;
`;

injectGlobal`
.fadeIn-appear {
  opacity: 0.01;
}

.fadeIn-appear.fadeIn-appear-active {
  opacity: 1;
  transition: opacity .3s ease-in;
}

.fadeIn-enter {
  opacity: 0.01;
}

.fadeIn-enter.fadeIn-enter-active {
  opacity: 1;
  transition: opacity .3s ease-in;
}

.fadeIn-leave {
  opacity: 1;
}

.fadeIn-leave.fadeIn-leave-active {
  opacity: 0.01;
  transition: opacity .3s ease-in;
}
`;
