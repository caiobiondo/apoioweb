import React from 'react';
import { Popover, Menu } from 'material-ui';

import { PopoverStyles, PopoverContent } from './Popover.styles';

const CareerPlanPopover = props => {
  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      className="Popover"
      anchorOrigin={props.anchorOrigin}
      targetOrigin={props.targetOrigin}
      onRequestClose={props.onRequestClose}
      style={PopoverStyles}
    >
      <Menu>
        <PopoverContent>{props.children}</PopoverContent>
      </Menu>
    </Popover>
  );
};

export default CareerPlanPopover;
