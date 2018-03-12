import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium, spPage } from 'styles/spacing';
import { RobotoRegular } from 'styles/typography';

export const Main = styled.div`
  margin: ${spMedium} ${spPage} ${spMedium} ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }
`;

export const ActionButtonContainer = styled.div`
  position: fixed;
  right: 42px;
  bottom: ${props => {
    return props.empty ? '24%' : '12%';
  }};
  z-index: 9999;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    right: ${spMedium};
  }
`;

export const CustomersSearchContainer = styled.div`
  margin-bottom: ${spMedium};
`;

export const SelectedCustomersDescription = styled.div`
  font-family: ${RobotoRegular};
  margin-left: 20px;
  min-height: 40px;
`;
