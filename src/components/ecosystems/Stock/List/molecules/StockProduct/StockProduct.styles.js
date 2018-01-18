import styled from 'styled-components';
import { gray200 } from 'styles/colors';
import { Responsive } from '@entria/components';
import { RobotoRegular } from 'styles/typography';

export const StockItemProductImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;

  svg {
    margin: 0 35px 0 30px;
    width: 114px;
  }

  img {
    margin: 0;
    width: 145px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;

    svg {
      margin: 0 15px 0 0;
      max-width: 80px;
      height: 75px;
    }

    img {
      margin: 0;
      max-width: 80px;
      height: 85px;
    }
  }
`;

export const StockItemProductImageFallback = styled.div`
  svg {
    fill: ${gray200};
    width: 114px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    svg {
      width: 75px;
    }
  }
`;

export const StockItemProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StockItemProductDetailsName = styled.div`
  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const StockItemProductDetailsCode = styled.div`
  font-family: ${RobotoRegular};
  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: 12px;
  }
`;

export const StockItemProductLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 90px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-top: 0;
    height: 85px;
  }
`;

export const productImageStyles = {
  display: 'inline-block',
  width: '50%',
};
