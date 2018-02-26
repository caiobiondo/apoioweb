import styled from 'styled-components';
import { LoadingWrapperStyle } from 'styles/mixins';
import { fs18, fw300 } from 'styles/typography';

import { spMedium, spPage } from 'styles/spacing';

export const LoadingWrapper = LoadingWrapperStyle;

export const fullContainer = `
  height: '100%',
`;

export const TrainingCategoriesDetailsWrapper = styled.div`
  position: relative;
`;

export const TrainingCategoriesDetailsContentWrapper = styled.div`
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  padding-bottom: ${spPage};
  box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
`;

export const TitleWrapper = styled.div`
  padding: 25px;
  position: relative;
`;

export const CategoryIcon = styled.img`
  left: 25px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 20px;
`;

export const Title = styled.h3`
  display: inline-block;
  margin: 0;
  padding: 0 20px 0 40px;
  font-size: ${fs18};
  font-weight: ${fw300};
`;

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
