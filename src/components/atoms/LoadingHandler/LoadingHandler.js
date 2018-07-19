import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'natura-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { LoadingContainer, LoadingContent } from './LoadingHandler.styles';

const Content = ({ children, loading }) => {
  if (loading) {
    return (
      <LoadingContainer key="loadingContainer">
        <Loading background="transparent" />
      </LoadingContainer>
    );
  }

  return <LoadingContent key="loadingContent">{children}</LoadingContent>;
};

const LoadingHandler = props => {
  const content = Content(props);

  return (
    <ReactCSSTransitionGroup
      transitionName="fadeIn"
      transitionAppearTimeout={300}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      transitionAppear
      transitionEnter
      transitionLeave
    >
      {content}
    </ReactCSSTransitionGroup>
  );
};

LoadingHandler.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

LoadingHandler.defaultProps = {
  loading: false,
};

export default LoadingHandler;
