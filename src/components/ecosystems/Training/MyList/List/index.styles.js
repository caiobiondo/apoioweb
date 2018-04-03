import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium, spPage } from 'styles/spacing';

export const Main = styled.div`
  margin: ${spMedium} ${spPage} ${spMedium} ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }
`;

export const CourseSearchContainer = styled.div`
  margin-bottom: ${spMedium};
`;
