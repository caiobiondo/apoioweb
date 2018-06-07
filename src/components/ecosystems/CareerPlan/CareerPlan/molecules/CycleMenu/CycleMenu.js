import React, { Component } from 'react';
import propTypes from 'prop-types';

import CareerPlanMenus from 'components/ecosystems/CareerPlan/enums/CareerPlanMenus';

import { CycleMenuWrapper, CycleMenuList, CycleMenuItem } from './CycleMenu.styles';

export class CycleMenu extends Component {
  constructor(props) {
    super();
    this.menuItems = this.getMenuItems(props);
  }

  getMenuItems = props => {
    if (!props.indicators) {
      return;
    }

    const firstRange = this.getRangeCycles(1, props);
    const secondRange = this.getRangeCycles(2, props);

    return [
      {
        id: CareerPlanMenus.CyclesFirstRange,
        label: `Ciclo ${firstRange.firstCycle}-${firstRange.lastCycle}`,
      },
      {
        id: CareerPlanMenus.CyclesSecondRange,
        label: `Ciclo ${secondRange.firstCycle}-${secondRange.lastCycle}`,
      },
      {
        id: CareerPlanMenus.Anual,
        label: 'Anual',
      },
    ];
  };

  getRangeCycles = (range, { indicators, cyclesPerPage }) => {
    const cycles = indicators[0].cycles;
    const splicedCycles = cycles.slice(
      range * cyclesPerPage - cyclesPerPage,
      range * cyclesPerPage - 1,
    );

    return {
      firstCycle: splicedCycles[0].cycle,
      lastCycle: splicedCycles[splicedCycles.length - 1].cycle,
    };
  };

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
    return (
      <CycleMenuWrapper>
        <CycleMenuList>{this.menuItems.map(this.renderMenuItem)}</CycleMenuList>
      </CycleMenuWrapper>
    );
  }
}

CycleMenu.propTypes = {
  onMenuChange: propTypes.func.isRequired,
};

export default CycleMenu;
