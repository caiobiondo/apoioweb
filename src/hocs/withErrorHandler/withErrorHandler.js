import React, { PureComponent } from 'react';
import { Modal, ModalButton } from 'natura-ui';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export const WithErrorHandler = Component => {
  return class WithErrorHandlerComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
      this.renderComponent = this.renderComponent.bind(this);
      this.state = {
        open: false,
        title: (
          <h3>
            <FormattedMessage id="error" />
          </h3>
        ),
        body: <FormattedMessage id="errorMessage" />,
        actions: [<ModalButton label="OK, entendi" primary={true} onClick={this.handleClose} />],
        errored: false,
      };
    }

    componentDidCatch(error, info) {
      console.log(error, info);
      this.setState({ open: true, errored: true });
    }

    handleClose(event) {
      event.stopPropagation();
      this.setState({ open: false }, () => {
        this.props.history.goBack();
      });
    }

    renderComponent() {
      if (this.state.errored) return null;

      return <Component {...this.props} />;
    }

    render() {
      return (
        <div>
          <Modal
            width={425}
            maxWidth={'85%'}
            open={this.state.open}
            title={this.state.title}
            actions={this.state.actions}
          >
            {this.state.body}
          </Modal>
          {this.renderComponent()}
        </div>
      );
    }
  };
};

export default Component => {
  return withRouter(WithErrorHandler(Component));
};
