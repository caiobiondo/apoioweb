// import styled from 'styled-components';
// import { Responsive } from '@entria/components';
import { LoadingWrapperStyle } from 'styles/mixins';

import { spPage } from 'styles/spacing';

export const LoadingWrapper = LoadingWrapperStyle;

export const WrapperStyle = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: spPage,
};

export const fullContainer = {
  height: '100%',
};
