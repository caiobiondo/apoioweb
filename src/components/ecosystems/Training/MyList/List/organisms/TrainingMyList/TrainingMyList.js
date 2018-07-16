import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import TrainingCourses from 'components/ecosystems/Training/molecules/TrainingCourses';
import {
  TrainingCoursesQuery,
  TrainingCoursesQueryOptions,
} from 'components/ecosystems/Training/data/TrainingCourses.data';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import PageMenu from 'components/ecosystems/Training/atoms/PageMenu/PageMenu';
import { graphql, compose, withApollo } from 'react-apollo';

import { translate } from 'locale';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RobotoRegular } from 'styles/typography';
import gql from 'graphql-tag';

import InfiniteScroll from 'components/organisms/InfiniteScroll';

import { Loading } from 'natura-ui';

import { injectIntl, FormattedMessage } from 'react-intl';

import {
  TrainingMyListWrapper,
  TrainingCourseFeedbackModalTitle,
  TrainingCourseFeedbackModalAction,
} from './TrainingMyList.styles';
import { getHeadersFromUser } from '../../../../../../../utils/getUserParams';

export class TrainingMyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackModalOpened: false,
      feedbackModalTitle: '',
    };
  }

  componentWillReceiveProps({ loading, courses }) {
    this.notifyLoadFinish(loading, courses);
  }

  notifyLoadFinish = (loading, courses) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, courses), this.isLoading(loading, courses));
    }
  };

  isLoading = (loading, courses) => {
    return loading && !courses;
  };

  isEmpty = (loading, courses) => {
    return !loading && (!courses || courses.length === 0);
  };

  handleMenuItemClick = (event, child) => {
    const { formatMessage } = this.props.intl;
    const {
      ciclo,
      grupo,
      gerenciaDeVendas,
      regiao,
      setor,
      gerenciaMercado,
      papelDaConsultora,
      canal,
      appVersion,
      origem,
    } = getHeadersFromUser(this.props.user);

    this.props
      .mutate({
        variables: {
          input: { action: child.props.value },
          sellerId: this.props.user.codigo,
          courseId: child.props.course.id,
          ciclo,
          grupo,
          gerenciaDeVendas,
          regiao,
          setor,
          gerenciaMercado,
          papelDaConsultora,
          canal,
          appVersion,
          origem,
        },
      })
      .then(response => {
        if (response.error) {
          const message =
            child.props.value === 'favorite'
              ? formatMessage({ id: 'trainingAddCourseError' })
              : formatMessage({ id: 'trainingRemoveCourseError' });
          this.setState({
            feedbackModalOpened: true,
            feedbackModalTitle: message,
          });
          // Handle error
          return;
        }

        if (!response.data.updateCourse.status) {
          const message =
            child.props.value === 'favorite'
              ? formatMessage({ id: 'trainingAddCourseFailure' })
              : formatMessage({ id: 'trainingRemoveCourseFailure' });
          this.setState({
            feedbackModalOpened: true,
            feedbackModalTitle: message,
          });
          // Handle not updated
          return;
        }

        const message =
          child.props.value === 'favorite'
            ? formatMessage({ id: 'trainingAddCourseSuccess' })
            : formatMessage({ id: 'trainingRemoveCourseSuccess' });

        this.setState(
          {
            feedbackModalOpened: true,
            feedbackModalTitle: message,
          },
          this.updateCachedList(child.props.course),
        );

        return;
      })
      .catch(err => {
        console.log('err', err);
        // Handle error
        const message =
          child.props.value === 'favorite'
            ? formatMessage({ id: 'trainingAddCourseError' })
            : formatMessage({ id: 'trainingRemoveCourseError' });
        this.setState({
          feedbackModalOpened: true,
          feedbackModalTitle: message,
        });
      });
  };

  updateCachedList = course => {
    const { client } = this.props;
    const isfavorite = course.isfavorite === 'true' ? 'false' : 'true';

    client.writeFragment({
      id: course.id,
      fragment: gql`
        fragment myCourse on Course {
          isfavorite
          __typename
        }
      `,
      data: {
        isfavorite,
        __typename: 'Course',
      },
    });

    let favoritedCourses = null;
    const { filter, ...otherVariables } = TrainingCoursesQueryOptions.options({
      ...this.props,
      favorite: true,
    }).variables;
    try {
      favoritedCourses = client.readQuery({
        query: TrainingCoursesQuery,
        variables: otherVariables,
      });
    } catch (e) {
      // could not find cache
    }

    if (favoritedCourses) {
      if (course.isfavorite === 'true') {
        favoritedCourses.courses.items = favoritedCourses.courses.items.filter(item => {
          return item.id !== course.id;
        });
      }

      if (course.isfavorite === 'false') {
        favoritedCourses.courses.items.push({ ...course, isfavorite: 'true' });
      }

      client.writeQuery({
        query: TrainingCoursesQuery,
        variables: otherVariables,
        data: favoritedCourses,
      });
    }
  };

  renderMenuItems = course => {
    const style = { fontFamily: RobotoRegular };

    if (course.isfavorite === 'true') {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onItemTouchTap={this.handleMenuItemClick}
        >
          <MenuItem
            style={style}
            primaryText={translate('trainingRemoveCourseMyList')}
            value="unfavorite"
            course={course}
          />
        </IconMenu>
      );
    }

    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        onItemTouchTap={this.handleMenuItemClick}
      >
        <MenuItem
          style={style}
          primaryText={translate('trainingAddCourseMyList')}
          value="favorite"
          course={course}
        />
      </IconMenu>
    );
  };

  handleClose = () => {
    this.setState({ feedbackModalOpened: false });
  };

  renderFeedbackModal = () => {
    const { feedbackModalTitle } = this.state;
    const actions = [
      <FlatButton
        label={<FormattedMessage id="ok" />}
        primary={true}
        labelStyle={TrainingCourseFeedbackModalAction}
        onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        key="feedbackModal"
        title={feedbackModalTitle}
        actions={actions}
        modal={false}
        open={this.state.feedbackModalOpened}
        titleStyle={TrainingCourseFeedbackModalTitle}
        onRequestClose={this.handleClose}
      />
    );
  };

  render() {
    const { fetchMore, loading, courses, hasNextPage } = this.props;

    if (!courses && loading) {
      return <Loading background="transparent" />;
    }

    return (
      <TrainingMyListWrapper>
        <PageMenu />
        <InfiniteScroll
          onScroll={fetchMore}
          hasMore={hasNextPage}
          loading={loading}
          items={courses}
          debounce={500}
          emptyList={
            <EmptyList
              icon="ico_list_add"
              titleId="coursesEmptyList"
              descriptionId="coursesEmptyListDescription"
            />
          }
        >
          <TrainingCourses {...this.props} renderMenuItems={this.renderMenuItems} />
        </InfiniteScroll>
        {this.renderFeedbackModal()}
      </TrainingMyListWrapper>
    );
  }
}

export const TrainingMyListWithIntl = injectIntl(TrainingMyList);
export const TrainingMyListWithApollo = withApollo(TrainingMyListWithIntl);

export default compose(
  graphql(TrainingCoursesQuery, TrainingCoursesQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(TrainingMyListWithApollo);
