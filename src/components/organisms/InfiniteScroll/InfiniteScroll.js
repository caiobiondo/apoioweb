import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Loading, CircularProgress, FormButton } from 'natura-ui';
import { translate } from 'locale';

import { debounce } from 'utils/debounce';

import { LoadingWrapper, searchButtonStyles } from './InfiniteScroll.styles';

export class InfiniteScroll extends Component {
  isEmpty = () => {
    return !this.props.items || !this.props.items.length;
  };

  onScroll = debounce(() => {
    this.props.onScroll();
  }, this.props.debounce);

  render() {
    const { loading, hasMore, children, items } = this.props;

    if (!items && loading) {
      return <Loading background="transparent" />;
    }

    if (this.isEmpty()) {
      return this.props.emptyList;
    }

    return (
      <div>
        {children}
        {loading && (
          <LoadingWrapper key="loadingWrapper">
            <CircularProgress thickness={2} />
          </LoadingWrapper>
        )}
        {!loading &&
          hasMore && (
            <LoadingWrapper key="loadingWrapper">
              <FormButton
                {...searchButtonStyles}
                primary
                onClick={this.onScroll}
                label={translate('viewMore')}
              />
            </LoadingWrapper>
          )}
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  onScroll: propTypes.func.isRequired,
  hasMore: propTypes.bool,
  loading: propTypes.bool.isRequired,
  children: propTypes.node.isRequired,
  debounce: propTypes.number,
  items: propTypes.array,
};

InfiniteScroll.defaultProps = {
  debounce: 0,
  hasMore: false,
  items: null,
};

export default InfiniteScroll;
