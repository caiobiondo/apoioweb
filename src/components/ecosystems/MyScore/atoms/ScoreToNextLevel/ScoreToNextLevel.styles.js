import styled from 'styled-components';
import { Responsive } from '@entria/components';

export const Wrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const ContentWrapper = styled.span`
  border: 1px solid #707070;
  padding: 4px 10px;
  font-family: Roboto-Regular;
  font-size: 13px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 11px;
  }
`;
