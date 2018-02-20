import React from 'react';

import CategoryCourse from '../CategoryCourse/CategoryCourse';

const renderCategoryCourse = course => {
  return (
    <li key={course.id}>
      <CategoryCourse course={course} />
    </li>
  );
};

const Category = ({ category }) => (
  <div>
    <div>
      <div>
        <img src={category.thumbnail} alt={category.title} />
        <h3>{category.name}</h3>
      </div>
      <span>
        <a href="#">Ver todos</a>
      </span>
    </div>

    <ul>{category.courses.map(course => renderCategoryCourse(course))}</ul>
  </div>
);

export default Category;
