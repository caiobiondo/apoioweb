import styled from 'styled-components';
import { LoadingWrapperStyle } from 'styles/mixins';
import { white } from 'styles/colors';

import { spPage } from 'styles/spacing';

export const LoadingWrapper = LoadingWrapperStyle;

export const WrapperStyle = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: spPage,
};

export const MultimediaItemsWrapper = styled.div`
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  padding-bottom: ${spPage};
  box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: ${white};
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px 5px 0 5px;
`;
