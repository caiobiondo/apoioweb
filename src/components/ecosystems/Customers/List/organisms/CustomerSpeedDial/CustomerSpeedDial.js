import React, { Component } from 'react';
import { Icon, FormButton, FloatingActionButton } from 'natura-ui';
import {
  Wrapper,
  IconWrapper,
  IconWrapperClose,
  IconWrapperOpen,
} from './CustomerSpeedDial.styles';
import { FormButtonWrapper, searchButtonStyles } from './CustomerSpeedBtn.style';

const actions = [
  { icon: 'ico_new_customer', name: 'Cadastrar cliente' },
  { icon: 'ico_mail', name: 'Enviar e-mail' },
  { icon: 'ico_cupom_tag', name: 'Cria cupom' },
  { icon: 'ico_download', name: 'Exporta excel' },
];

const style = {
  SpeedDial: {
    zIndex: 100,
    position: 'fixed',
    bottom: '9px',
    right: '9px',
  },
};

export default class CustomerSpeedDial extends Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  render() {
    const { hidden, open } = this.state;
    return (
      <div>
        {!open && (
          <Wrapper
            onClick={this.handleClick}
            style={{
              flexDirection: 'row-reverse',
              flexWrap: 'wrap',
              display: 'flex',
              ...style.SpeedDial,
            }}
          >
            <FloatingActionButton iconWrapper={IconWrapperOpen}>
              <Icon file={'ico_plus'} />
            </FloatingActionButton>
          </Wrapper>
        )}
        {open && (
          <div style={style.SpeedDial}>
            <Wrapper
              onClick={this.handleClick}
              style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', display: 'flex' }}
            >
              <FloatingActionButton iconWrapper={IconWrapperClose}>
                <Icon file={'ico_plus'} />
              </FloatingActionButton>
            </Wrapper>
            {actions.map((action, idx) => (
              <div key={idx} style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex' }}>
                <FormButtonWrapper>
                  <FormButton {...searchButtonStyles} type="submit" label={action.name} />
                </FormButtonWrapper>
                <Wrapper
                  onClick={() => {
                    console.log(`Click icone ${action.icon}`);
                  }}
                >
                  <FloatingActionButton iconWrapper={IconWrapper}>
                    <Icon file={action.icon} />
                  </FloatingActionButton>
                </Wrapper>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
