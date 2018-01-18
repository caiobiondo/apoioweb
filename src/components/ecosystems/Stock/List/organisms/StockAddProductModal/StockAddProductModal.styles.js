import styled from 'styled-components';
import { gray200 } from 'styles/colors';
import { RobotoMedium, NaturaBold } from 'styles/typography';
import { Responsive } from '@entria/components';

export const FormWrapper = styled.div`
  flex: 1 1 55%;
`;

export const StockProductWrapper = styled.div`
  flex: 1 1 45%;
  justify-content: center;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-bottom: 5px;
  }
`;

export const ModalTitleWrapper = styled.div`
  padding-bottom: 0 !important;

  > div {
    font-size: 25px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    padding-bottom: 20px !important;

    > div {
      margin-bottom: 0;
      font-size: 18px;
      line-height: 20px;
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const ModalContentWrapper = styled.div`
  display: flex;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column-reverse;
  }
`;

export const FormInputWrapper = styled.div`
  & + & {
    margin-top: 30px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    & + & {
      margin-top: 10px;
    }
  }
`;

export const StockItemProductImageFallback = styled.div`
  svg {
    fill: ${gray200};
    width: 50px;
  }
`;

export const FormButtonWrapper = styled.div`
  margin-top: 54px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-top: 24px;

    > div {
      width: 100%;
    }
  }
`;

export const FormButtonStyles = {
  buttonStyle: {
    fontFamily: RobotoMedium,
    minWidth: '128px',
  },
  overlayStyle: {
    minWidth: '128px',
  },
  height: '50px',
};

export const titleStyle = {
  fontFamily: NaturaBold,
};

export const contentStyle = {
  maxWidth: '800px',
};

export const bodyStyle = {
  borderWidth: 0,
};
