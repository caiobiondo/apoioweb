import styled from 'styled-components';
import { spMedium, spPage, screenMd } from 'styles/spacing';

export const Main = styled.div`
  margin: ${spMedium} ${spPage} ${spMedium} ${spMedium};

  @media (max-width: ${screenMd}) {
    margin: ${spMedium} 0;
    padding: 0 10px;
  }
`;
