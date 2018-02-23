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

export const TrainingCategoriesDetailsWrapper = styled.div`
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  padding-bottom: ${spPage};
  box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
`;

export const fullContainer = {
  height: '100%',
};

export const Header = styled.div``;

export const BackButtonWrapper = styled.div``;

export const BackButton = styled.a``;

export const BackButtonIcon = styled.div``;

export const CategoryPercentageWrapper = styled.div``;

export const CategoryPercentageLabel = styled.div``;

export const CategoryPercentageBar = styled.div``;

export const Banner = styled.div``;

export const BannerContent = styled.div``;
