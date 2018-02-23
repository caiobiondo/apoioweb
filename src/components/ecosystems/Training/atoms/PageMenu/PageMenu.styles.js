import styled from 'styled-components';
import { Responsive, getTheme } from '@entria/components';
import { spMedium } from 'styles/spacing';

export const Container = styled.div`
  margin-bottom: ${spMedium};
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: flex-end;
  background-color: #ffffff;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    a {
      font-size: 10px !important;
    }
  }
`;

export const LinkWrapper = styled.div`
  margin-left: 20px;
  padding: 5px 5px 0 5px;

  > a {
    padding-bottom: 5px;
    outline: none;
    text-transform: uppercase;
  }

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    margin-left: 0;
    padding: 5px 5px 0 5px;

    > a {
      min-width: 60px !important;
      margin: 0 2px;
    }
  }
`;

export const Link = {
  transition: 'all 200ms',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 'bold',
  color: '#676767',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 50,
  boxSizing: 'border-box',
  minWidth: 120,
};

export const ActiveLink = {
  borderBottom: `2px solid ${getTheme().palette.primary1Color}`,
};
