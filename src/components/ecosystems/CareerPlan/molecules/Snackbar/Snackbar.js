import React, { Component } from 'react';
import { Snackbar } from 'material-ui';

import { SnackbarStyles, SnackbarContainer } from './Snackbar.styles';

const SnackbarMessage = message => {
  const event = new CustomEvent('SHOW_SNACKBAR', { detail: { message } });
  return document.dispatchEvent(event);
};

export class SnackbarComponent extends Component {
  componentWillMount() {
    document.addEventListener('SHOW_SNACKBAR', event => {
      this.show(event.detail.message);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('SHOW_SNACKBAR');
  }

  state = {
    show: false,
    message: '',
  };

  show = (message = '') => {
    this.setState({ show: true, message });
  };

  hide = () => {
    this.setState({ show: false });
  };

  render() {
    const { show, message } = this.state;

    return (
      <SnackbarContainer>
        <Snackbar
          open={show}
          className="Snackbar"
          onRequestClose={this.hide}
          autoHideDuration={this.props.autoHideDuration}
          message={message}
          style={SnackbarStyles}
        />
      </SnackbarContainer>
    );
  }
}

SnackbarComponent.defaultProps = {
  autoHideDuration: 2000,
};

export default SnackbarMessage;
