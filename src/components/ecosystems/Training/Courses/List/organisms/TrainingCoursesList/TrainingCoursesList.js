import React, { Component } from 'react';
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

import EmptyList from 'components/molecules/EmptyList/EmptyList';
import InfiniteScroll from 'components/organisms/InfiniteScroll';

import { Loading } from 'natura-ui';

import { injectIntl, FormattedMessage } from 'react-intl';

import StartedCoursesList from '../../organisms/StartedCoursesList/StartedCoursesList';

import CourseFormSearch from '../../../../molecules/CourseFormSearch';

import {
  StartedWrapper,
  TrainingCoursesListWrapper,
  TrainingCourseFeedbackModalTitle,
  TrainingCourseFeedbackModalAction,
  CourseSearchContainer,
} from './TrainingCoursesList.styles';
import { getHeadersFromUser } from '../../../../../../../utils/getUserParams';

export class TrainingCoursesList extends Component {
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

  notifyLoadFinish = (loading, items) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, items), this.isLoading(loading, items));
    }
  };

  isLoading = (loading, items) => {
    return loading && !items;
  };

  isEmpty = (loading, items) => {
    return !loading && (!items || items.length === 0);
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

        // Handle update success
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
        key="ok"
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
    if (!this.props.courses && this.props.loading) {
      return <Loading background="transparent" />;
    }

    const baseFormSearchProps = {
      onSearch: this.props.onSearch,
      searchValue: this.props.courseFilter,
      status: this.props.status,
      sectionTitle: { iconName: 'ico_graduate_cap', value: 'myTrainings' },
      description: 'myTrainingsSearchDescription',
      inputLabel: 'trainingLabel',
    };
    const titleToEmptyList =
      this.props.courseFilter || this.props.status ? 'coursesNoSearchResult' : 'coursesEmptyList';

    return (
      <StartedWrapper>
        <StartedCoursesList status="started" user={this.props.user} />
        <CourseSearchContainer>
          <CourseFormSearch {...baseFormSearchProps} />
        </CourseSearchContainer>

        <TrainingCoursesListWrapper>
          <PageMenu {...this.props} />
          <InfiniteScroll
            onScroll={this.props.fetchMore}
            hasMore={this.props.hasNextPage}
            loading={this.props.loading}
            debounce={500}
            items={this.props.courses}
            emptyList={
              <EmptyList
                icon="ico_list_add"
                titleId={titleToEmptyList}
                descriptionId="coursesEmptyListDescription"
              />
            }
          >
            <TrainingCourses {...this.props} renderMenuItems={this.renderMenuItems} />
          </InfiniteScroll>
          {this.renderFeedbackModal()}
        </TrainingCoursesListWrapper>
      </StartedWrapper>
    );
  }
}

export const TrainingCoursesListWithIntl = injectIntl(TrainingCoursesList);
export const TrainingCoursesListWithApollo = withApollo(TrainingCoursesListWithIntl);

export default compose(
  graphql(TrainingCoursesQuery, TrainingCoursesQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(TrainingCoursesListWithApollo);
