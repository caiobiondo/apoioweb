import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Loading, CircularProgress, FormButton } from 'natura-ui';
import { translate } from 'locale';

import { LoadingWrapper, searchButtonStyles } from './InfiniteScroll.styles';

export class InfiniteScroll extends Component {
  state = {
    viewMoreDisabled: false,
  };

  componentWillReceiveProps({ items }) {
    if (this.state.viewMoreDisabled && this.props.items.length !== items.length) {
      this.setState({ viewMoreDisabled: false });
    }
  }

  isEmpty = () => {
    return !this.props.items || !this.props.items.length;
  };

  onScroll = () => {
    this.setState({ viewMoreDisabled: true }, this.props.onScroll);
  };

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
        {this.state.viewMoreDisabled && (
          <LoadingWrapper key="loadingWrapper">
            <CircularProgress thickness={2} />
          </LoadingWrapper>
        )}
        {!this.state.viewMoreDisabled &&
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
