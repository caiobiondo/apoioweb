import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PREFIX } from 'config';

import {
  SubCategoryWrapper,
  SubCategoryTitleWrapper,
  SubCategoryIcon,
  SubCategoryTitle,
} from './SubCategory.styles.js';

const SubCategory = ({ category }) => {
  return (
    <SubCategoryWrapper>
      <Link to={`${ROUTE_PREFIX}/training/categories/${category.id}`}>
        <SubCategoryTitleWrapper>
          <SubCategoryIcon src={category.thumbnail} />
          <SubCategoryTitle>{category.name}</SubCategoryTitle>
        </SubCategoryTitleWrapper>
      </Link>
    </SubCategoryWrapper>
  );
};

export default SubCategory;
