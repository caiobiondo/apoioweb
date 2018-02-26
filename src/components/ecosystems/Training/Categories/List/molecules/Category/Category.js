import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import CategoryCourse from '../CategoryCourse/CategoryCourse';
import SubCategory from '../SubCategory/SubCategory';

import {
  CategoryWrapper,
  CategoryTitleHolder,
  CategoryIcon,
  CategoryTitle,
  ViewAllLink,
  ViewAll,
  List,
} from './Category.styles';

const renderSubCategories = categories => {
  return <List>{categories.map(category => renderSubCategory(category))}</List>;
};

const renderSubCategory = category => {
  return <SubCategory key={category.id} category={category} />;
};

const renderCourses = courses => {
  return <List>{courses.map(course => renderCategoryCourse(course))}</List>;
};

const renderCategoryCourse = course => {
  return <CategoryCourse key={course.id} course={course} />;
};

const Category = ({ category }) => {
  const hasCourses = () => {
    return category.courses && category.courses.length;
  };

  const hasSubCategories = () => {
    return category.categories && category.categories.length;
  };

  if (!category || (!hasCourses() && !hasSubCategories())) {
    return null;
  }

  const childList = hasSubCategories()
    ? renderSubCategories(category.categories)
    : renderCourses(category.courses);

  return (
    <CategoryWrapper>
      <CategoryTitleHolder>
        <CategoryIcon src={category.thumbnail} alt={category.title} />
        <CategoryTitle>{category.name}</CategoryTitle>

        <ViewAll>
          <ViewAllLink href={`/training/categories/${category.id}`} title={category.name}>
            <FormattedMessage id="viewAllCourses" />
          </ViewAllLink>
        </ViewAll>
      </CategoryTitleHolder>

      {childList}
    </CategoryWrapper>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

export default Category;
