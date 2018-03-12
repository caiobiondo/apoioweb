import React from 'react';
import { Paper } from 'natura-ui';
import { Table, TableRow, TableBody, TableCell, WrapperStyles, ArrowUp } from './LevelList.styles';

const LevelList = props => {
  return (
    <Paper style={WrapperStyles}>
      <ArrowUp />
      <Table>
        <TableBody>
          {props.levels.map((level, index) => {
            return (
              <TableRow color={level.color} key={index}>
                <TableCell>{level.text}</TableCell>
                <TableCell>{level.pointsText}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default LevelList;
