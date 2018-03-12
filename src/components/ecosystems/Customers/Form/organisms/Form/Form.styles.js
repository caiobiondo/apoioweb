import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { RobotoRegular, RobotoMedium, NaturaBold } from 'styles/typography';

export const Wrapper = styled.form`
  margin-bottom: 40px;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    padding: 20px;
  }
`;

export const FormWrapper = styled.div`
  margin: 0 auto;
  width: ${Responsive.VIEWPORT.SMALL}px;
  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    width: 100%;
  }
`;

export const FormButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  > div + div {
    margin-left: 30px;
  }
`;

export const formButtonStyles = {
  labelStyle: {
    fontFamily: RobotoMedium,
  },
  height: '50px',
};

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
