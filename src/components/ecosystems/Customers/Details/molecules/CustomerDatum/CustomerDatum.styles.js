import styled from 'styled-components';
import { fs16 } from 'styles/typography';
import { gray890, gray700 } from 'styles/colors';

export const CustomerDatumBase = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;

  flex: 0 1 auto;
`;

export const CustomerDatumLabel = styled.div`
  color: ${gray700};
  font-size: ${fs16};
  margin-bottom: 13.5px;
`;

export const CustomerDatumValue = styled.div`
  color: ${gray890};
  font-size: ${fs16};

  flex: 1 1 auto;
  margin-bottom: 10px;
`;
