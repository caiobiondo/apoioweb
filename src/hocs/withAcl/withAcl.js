import React, { PureComponent } from 'react';
import { Modal, ModalButton } from 'natura-ui';
import { FormattedMessage } from 'react-intl';

export const ROOT_PATH = '/';
export const API_AUTH_ERROR_MSG = '#REDIRECT_TO_LOGIN#';

export default (Component, resource) => {
  return class WithAclComponent extends PureComponent {
    hasAccessToPage = user => {
      return !!user.acl[resource];
    };

    redirectToRoot = event => {
      event.preventDefault();
      event.stopPropagation();
      window.history.back();
    };

    render() {
      if (!this.hasAccessToPage(this.props.user)) {
        const modalTitle = (
          <h3>
            <FormattedMessage id="error" />
          </h3>
        );

        const modalActions = [
          <ModalButton
            label={<FormattedMessage id="dismiss" />}
            primary={true}
            onClick={this.redirectToRoot}
          />,
        ];

        return (
          <div>
            <Modal
              width={425}
              maxWidth={'85%'}
              open={true}
              title={modalTitle}
              actions={modalActions}
            >
              <FormattedMessage id="aclErrorMessage" />
            </Modal>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
};
