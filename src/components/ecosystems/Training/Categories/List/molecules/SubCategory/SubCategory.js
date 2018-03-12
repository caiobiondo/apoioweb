import React from 'react';

import {
  SubCategoryWrapper,
  SubCategoryLink,
  SubCategoryTitleWrapper,
  SubCategoryIcon,
  SubCategoryTitle,
} from './SubCategory.styles.js';

const SubCategory = ({ category }) => {
  return (
    <SubCategoryWrapper>
      <SubCategoryLink href={`/training/categories/${category.id}`} title={category.name}>
        <SubCategoryTitleWrapper>
          <SubCategoryIcon src={category.thumbnail} />
          <SubCategoryTitle>{category.name}</SubCategoryTitle>
        </SubCategoryTitleWrapper>
      </SubCategoryLink>
    </SubCategoryWrapper>
  );
};

export default SubCategory;
