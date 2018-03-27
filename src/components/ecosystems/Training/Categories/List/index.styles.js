import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium, spPage } from 'styles/spacing';
import { Full } from 'styles/mixins';

export const Main = styled.div`
  margin: ${spMedium} ${spPage} ${spMedium} ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }

  ${props => {
    return props.loading || props.empty ? Full : null;
  }};
`;

export const CourseSearchContainer = styled.div`
  margin-bottom: ${spMedium};
`;
