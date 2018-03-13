import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import {
  TrainingCategoriesDetailsQuery,
  TrainingCategoriesDetailsOptions,
} from './TrainingCategoriesDetails.data';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { graphql, compose } from 'react-apollo';

import TrainingCategoriesDetailsHeader from '../../molecules/Header/TrainingCategoriesDetailsHeader';
import TrainingCourses from 'components/ecosystems/Training/molecules/TrainingCourses';
import InfiniteScroll from 'components/organisms/InfiniteScroll';

import { translate } from 'locale';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RobotoRegular } from 'styles/typography';

import { injectIntl, FormattedMessage } from 'react-intl';

import {
  TrainingCategoriesDetailsWrapper,
  TrainingCategoriesDetailsContentWrapper,
  TitleWrapper,
  CategoryIcon,
  Title,
  TrainingCourseFeedbackModalTitle,
  TrainingCourseFeedbackModalAction,
} from './TrainingCategoriesDetails.styles';

export class TrainingCategoriesDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackModalOpened: false,
      feedbackModalTitle: '',
    };
  }

  componentWillReceiveProps({ loading, trainingCourses }) {
    this.notifyLoadFinish(loading, trainingCourses);
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

    this.props
      .mutate({
        variables: {
          input: { action: child.props.value },
          sellerId: this.props.user.codigo,
          courseId: child.props.course.id,
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
        this.props.refetch();
        const message =
          child.props.value === 'favorite'
            ? formatMessage({ id: 'trainingAddCourseSuccess' })
            : formatMessage({ id: 'trainingRemoveCourseSuccess' });

        this.setState({
          feedbackModalOpened: true,
          feedbackModalTitle: message,
        });

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
    const { loading, hasNextPage, trainingCourses, trainingCategory, fetchMore } = this.props;

    if (!trainingCategory) {
      return null;
    }

    return (
      <TrainingCategoriesDetailsWrapper>
        <TrainingCategoriesDetailsHeader category={trainingCategory} />
        <TrainingCategoriesDetailsContentWrapper>
          <TitleWrapper>
            <CategoryIcon src={trainingCategory.thumbnail} alt={trainingCategory.name} />
            <Title>{trainingCategory.name}</Title>
          </TitleWrapper>
          <InfiniteScroll
            onScroll={fetchMore}
            hasMore={hasNextPage}
            loading={loading}
            debounce={500}
            items={trainingCourses}
            emptyList={
              <EmptyList
                icon="ico_list_add"
                titleId="coursesEmptyList"
                descriptionId="coursesEmptyListDescription"
              />
            }
          >
            <TrainingCourses courses={trainingCourses} renderMenuItems={this.renderMenuItems} />
          </InfiniteScroll>
          {this.renderFeedbackModal()}
        </TrainingCategoriesDetailsContentWrapper>
      </TrainingCategoriesDetailsWrapper>
    );
  }
}

export const TrainingCategoriesDetailsWithIntl = injectIntl(TrainingCategoriesDetails);

export default compose(
  graphql(TrainingCategoriesDetailsQuery, TrainingCategoriesDetailsOptions),
  graphql(TrainingCourseUpdateMutation),
)(TrainingCategoriesDetailsWithIntl);
