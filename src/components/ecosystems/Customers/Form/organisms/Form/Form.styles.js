import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { RobotoRegular, NaturaBold } from 'styles/typography';

export const Wrapper = styled.form`
  margin-bottom: 40px;
`;

export const FormWrapper = styled.div`
  margin: 0 auto;
  width: ${Responsive.VIEWPORT.SMALL}px;
  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    width: 100%;
  }
`;

export const FormButtonsWrapper = styled.div`
  text-align: center;

  & > * {
    display: inline-block;
    margin-right: 30px !important;
  }

  & > *:last-child {
    margin-right: 0 !important;
  }

  button {
    color: white;
    text-align: center;
  }

  button div {
    text-align: center !important;
    display: inline !important;
  }
`;

export const PageTitle = styled.h1`
  color: #f3971f;
  font-size: 43px;
  font-family: ${NaturaBold};
  width: 100%;
  text-align: center;
  margin-bottom: 47px;
`;

export const PageText = styled.p`
  text-align: center;
  font-size: 16px;
  font-family: ${RobotoRegular};
  color: #333;
  margin-bottom: 113px;
`;
