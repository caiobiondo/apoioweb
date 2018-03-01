import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Row, Col, Grid } from 'react-flexbox-grid';

import { CourseViewQuery, CourseViewQueryOptions } from './CourseView.data';
import { Main, MylistButtonWrapper, MylistButton } from './CourseView.styles';

import CourseContent from '../../molecules/CourseContent';
import CourseDescription from '../../molecules/CourseDescription';
import RelatedCourses from '../../molecules/RelatedCourses';
import CourseViewHeader from '../../molecules/CourseViewHeader';
import EmptyList from 'components/molecules/EmptyList/EmptyList';

import { Loading, FlatButton, Icon, IconButton } from 'natura-ui';
import { translate } from 'locale';

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

    if (!course && this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (!course.id) {
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
        <Grid fluid>
          <CourseViewHeader course={course} />
          <CourseContent />
          <CourseDescription course={course} />
          <Row>
            <Col md={1} sm={1}>
              {course.isfavorite && (
                <MylistButtonWrapper>
                  <FlatButton
                    {...MylistButton}
                    label={translate('myList')}
                    icon={
                      <IconButton>
                        <Icon file="ico_plus" />
                      </IconButton>
                    }
                  />
                </MylistButtonWrapper>
              )}
            </Col>
          </Row>
          <RelatedCourses />
        </Grid>
      </Main>
    );
  }
}

export default graphql(CourseViewQuery, CourseViewQueryOptions)(CourseView);
