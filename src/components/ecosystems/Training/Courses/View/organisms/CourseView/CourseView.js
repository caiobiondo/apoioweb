import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { CourseViewQuery, CourseViewQueryOptions } from './CourseView.data';
import CourseContent from '../../molecules/CourseContent';
import CourseDescription from '../../molecules/CourseDescription';
import RelatedCourses from '../../molecules/RelatedCourses';

import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { Main } from './CourseView.styles';
import { Loading } from 'natura-ui';

export class CourseView extends Component {
  componentWillReceiveProps({ loading, course }) {
    this.notifyLoadFinish(loading, course);
  }

  notifyLoadFinish = (loading, course) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, course), this.isLoading(loading, course));
    }
  };

  isLoading = (loading, course) => loading && !course;

  isEmpty = (loading, course) => !loading && !course.id;

  render() {
    const { course } = this.props;

    if (!this.props.course && this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (!this.props.course.id) {
      return (
        <Main>
          <EmptyList
            icon="ico_list_add"
            titleId="myCourseEmptyList"
            descriptionId="myCourseEmptyListDescription"
          />
        </Main>
      );
    }

    return (
      <Main>
        <CourseContent />
        <CourseDescription />
        <RelatedCourses />
      </Main>
    );
  }
}

export default graphql(CourseViewQuery, CourseViewQueryOptions)(CourseView);
