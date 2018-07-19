import styled from 'styled-components';
import { RobotoRegular } from 'styles/typography';

export const SnackbarStyles = {
  margin: '50px',
  overflow: 'hidden',
};

export const SnackbarContainer = styled.div`
  > div > div {
    align-items: center !important;
    border-radius: 30px !important;
    display: flex !important;
    font-family: ${RobotoRegular} !important;
    padding: 30px 40px !important;
  }
`;
