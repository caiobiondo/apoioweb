import React, { Component } from 'react';
import propTypes from 'prop-types';

import { CycleMenuWrapper, CycleMenu, CycleMenuItem } from './CycleMenu.styles';

export class IndicatorData extends Component {
  renderMenuItem = menuItem => {
    const { onMenuChange, activeMenu } = this.props;

    return (
      <CycleMenuItem
        key={menuItem.id}
        active={menuItem.id === activeMenu}
        onClick={() => onMenuChange(menuItem)}
      >
        {menuItem.label}
      </CycleMenuItem>
    );
  };

  render() {
    const { menuItems } = this.props;

    return (
      <CycleMenuWrapper>
        <CycleMenu>{menuItems.map(this.renderMenuItem)}</CycleMenu>
      </CycleMenuWrapper>
    );
  }
}

IndicatorData.propTypes = {
  menuItems: propTypes.array.isRequired,
  onMenuChange: propTypes.func.isRequired,
};

export default IndicatorData;
