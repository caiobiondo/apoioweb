import React, { Component } from 'react';
import propTypes from 'prop-types';

import { CycleMenuWrapper, CycleMenu, CycleMenuItem } from './CycleMenu.styles';

export class IndicatorData extends Component {
  render() {
    const { menuItems, onMenuChange, activeMenu } = this.props;

    return (
      <CycleMenuWrapper>
        <CycleMenu>
          {menuItems.map(item => (
            <CycleMenuItem active={item.id === activeMenu} onClick={() => onMenuChange(item)}>
              {item.label}
            </CycleMenuItem>
          ))}
        </CycleMenu>
      </CycleMenuWrapper>
    );
  }
}

IndicatorData.propTypes = {
  menuItems: propTypes.array.isRequired,
  onClick: propTypes.func.isRequired,
};

export default IndicatorData;
