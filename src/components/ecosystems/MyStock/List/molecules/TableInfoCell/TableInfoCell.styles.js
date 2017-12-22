import styled from 'styled-components';
import { gray200 } from 'styles/colors';
import ImageWithFallback from 'components/molecules/ImageWithFallback';
import { fs10, fs14, RobotoRegular } from 'styles/typography';

export const Wrapper = styled.div`
  padding: 16px 10px 16px 22px;
  font-family: ${RobotoRegular};
  display: flex;
  align-items: center;
`;

export const ProductImage = styled(ImageWithFallback)`
  margin-right: 25px;
  display: inline-block;
`;

export const ProductName = styled.div`
  margin-bottom: 5px;
  font-size: ${fs14};
`;

export const ProductCode = styled.div`
  font-size: ${fs10};
  color: ${gray200};
  text-transform: uppercase;
`;

export const ValuesWrapper = styled.div`
  display: inline-block;
`;
