import React, { Component } from 'react';

import CareerPlanMenus from 'components/ecosystems/CareerPlan/enums/CareerPlanMenus';

import CyclesIndicatorList from 'components/ecosystems/CareerPlan/Cycles/organisms/IndicatorList';
import AnualIndicatorList from 'components/ecosystems/CareerPlan/Anual/organisms/IndicatorList';

export default class CycleMenuViewer extends Component {
  render() {
    const { activeMenu, cyclesPerPage } = this.props;
    const firstRange = { from: 0, to: cyclesPerPage };
    const secondRange = { from: 2 * cyclesPerPage - cyclesPerPage, to: 999 };

    const menuItemsContent = {
      [CareerPlanMenus.CyclesFirstRange]: (
        <CyclesIndicatorList range={firstRange} {...this.props} />
      ),

      [CareerPlanMenus.CyclesSecondRange]: (
        <CyclesIndicatorList range={secondRange} {...this.props} />
      ),

      [CareerPlanMenus.Anual]: <AnualIndicatorList {...this.props} />,
    };

    return menuItemsContent[activeMenu];
  }
}
