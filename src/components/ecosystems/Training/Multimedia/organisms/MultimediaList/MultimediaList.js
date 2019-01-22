import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose, withApollo } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';

import { Loading } from 'natura-ui';
import { translate } from 'locale';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RobotoRegular } from 'styles/typography';

import MultimediaItems from 'components/ecosystems/Training/molecules/MultimediaItems';

import {
  TrainingMultimediaQuery,
  TrainingMultimediaQueryOptions,
} from '../../../data/TrainingMultimedia.data';

import PageMenu from 'components/ecosystems/Training/atoms/PageMenu/PageMenu';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import InfiniteScroll from 'components/organisms/InfiniteScroll';

import { StartedWrapper, TrainingMultimediaListWrapper } from './MultimediaList.styles';
import { getHeadersFromUser } from '../../../../../../utils/getUserParams';

export class MultimediaList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackModalOpened: false,
      feedbackModalTitle: '',
    };
  }

  componentWillReceiveProps({ loading, multimedias }) {
    this.notifyLoadFinish(loading, multimedias);
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
    const { filter, ...otherVariables } = TrainingMultimediaQueryOptions.options({
      ...this.props,
      favorite: true,
    }).variables;
    try {
      favoritedCourses = client.readQuery({
        query: TrainingMultimediaQuery,
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
        query: TrainingMultimediaQuery,
        variables: otherVariables,
        data: favoritedCourses,
      });
    }
  };

  render() {
    if (!this.props.multimedias && this.props.loading) {
      return <Loading background="transparent" />;
    }
    const titleToEmptyList =
      this.props.courseFilter || this.props.status
        ? 'multimediaNoSearchResult'
        : 'multimediaEmptyList';

    return (
      <StartedWrapper>
        <TrainingMultimediaListWrapper>
          <PageMenu />
          <InfiniteScroll
            onScroll={this.props.fetchMore}
            hasMore={this.props.hasNextPage}
            loading={this.props.loading}
            debounce={500}
            items={this.props.multimedias}
            emptyList={
              <EmptyList
                icon="ico_list_add"
                titleId={titleToEmptyList}
                descriptionId="multimediasEmptyListDescription"
              />
            }
          >
            <MultimediaItems {...this.props} />
          </InfiniteScroll>
        </TrainingMultimediaListWrapper>
      </StartedWrapper>
    );
  }
}

export const MultimediaListWithIntl = injectIntl(MultimediaList);
export const MultimediaListWithApollo = withApollo(MultimediaListWithIntl);

export default compose(graphql(TrainingMultimediaQuery, TrainingMultimediaQueryOptions))(
  MultimediaListWithApollo,
);
