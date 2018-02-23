import styled from 'styled-components';
import { LoadingWrapperStyle } from 'styles/mixins';

import { spMedium, spPage } from 'styles/spacing';

export const LoadingWrapper = LoadingWrapperStyle;

export const List = styled.ul`
  padding-left: 0;
  padding-top: ${spMedium};
  margin: ${spMedium};
  list-style-type: none;
`;

export const ListItem = styled.li`
  list-style-type: none;
  margin-bottom: 70px;
`;

export const WrapperStyle = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: spPage,
};

export const fullContainer = {
  height: '100%',
};
