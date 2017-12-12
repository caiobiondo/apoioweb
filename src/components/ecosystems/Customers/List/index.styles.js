import styled, { css } from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium, spPage } from 'styles/spacing';

const Full = css`
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

export const Main = styled.div`
  margin: ${spMedium} ${spPage} ${spMedium} ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }

  ${props => {
    return props.loading || props.empty ? Full : null;
  }};
`;
