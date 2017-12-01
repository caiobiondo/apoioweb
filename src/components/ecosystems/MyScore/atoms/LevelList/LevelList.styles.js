import styled from 'styled-components';

export const WrapperStyles = {
  borderRadius: '5px',
  padding: '13px',
  width: '175px',
  position: 'relative',
  marginTop: '18px',
};

export const Table = styled.table`
  margin: 0 auto;
`;

export const TableRow = styled.tr`
  color: ${props => props.color};

  &:last-child td {
    padding-bottom: 0;
  }
`;

export const TableCell = styled.td`
  font-family: Lato-Regular;
  font-size: 9.6px;
  padding-bottom: 17px;

  &:last-child {
    padding-left: 19px;
  }
`;

export const ArrowUp = styled.div`
  border: 1px solid #dadada;
  border-bottom: none;
  border-right: none;
  background: white;
  position: absolute;
  top: -11px;
  z-index: 1;
  cursor: default;
  pointer-events: none;
  width: 20px;
  height: 20px;
  left: 50%;

  transform: translateX(-50%) rotate(45deg);
`;

export const TableBody = styled.tbody``;
