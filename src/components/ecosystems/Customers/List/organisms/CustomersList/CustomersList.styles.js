import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spPage } from 'styles/spacing';
import { gray300, gray400, white, orange100 } from 'styles/colors';
import { LoadingWrapperStyle } from 'styles/mixins';

export const Wrapper = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const cellStyle = {
  position: 'relative',
  padding: '0px 20px',
  lineHeight: '50px',
  color: gray300,
  fontSize: '15px',
  fontFamily: 'Roboto',
};

export const SelectedRowStyle = {
  background: gray400,
};

export const LinkStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
};

export const TableWrapper = styled.div`
  padding: 0px 20px;

  table tr td:first-child div {
    opacity: 0;
    transition: all 0.2s ease;
  }

  tr {
    transition: all 0.2s ease;
    background: ${white};

    td:first-child .is-selected,
    td:first-child .is-selected * {
      opacity: 1;
    }
  }

  thead tr th {
    color: ${gray300} !important;
    font-size: 15px !important;
    font-weight: 400 !important;
    text-transform: uppercase;
  }

  tbody tr:hover {
    td:first-child div {
      opacity: 1;
    }

    background: #f6f6f6;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    tr td,
    tr th {
      display: none;
    }

    tr th:first-child,
    tr td:first-child {
      display: table-cell;
      width: 1px !important;
    }

    tr th:nth-child(2),
    tr td:nth-child(2) {
      display: table-cell;
    }

    td:first-child,
    td:first-child * {
      opacity: 1 !important;
    }
  }
`;

export const CustomerName = styled.div`
  display: flex;
`;

export const CustomerAvatarStyle = {
  display: 'block',
  alignSelf: 'center',
  borderRadius: '100%',
  textAlign: 'center',
  width: '50px',
  minWidth: '50px',
  height: '50px',
  lineHeight: '50px',
  fontSize: '17px',
  color: white,
  background: orange100,
  marginLeft: '0',
  overflow: 'hidden',
  marginRight: '20px',
  textTransform: 'uppercase',
};

export const NameLabel = styled.figure`
  display: block;
  height: 50px;
  line-height: 54px;
  margin-left: 0;
  margin-right: 0;
`;

export const LoadingWrapper = LoadingWrapperStyle;

export const scrolledContainer = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: spPage,
};

export const fullContainer = {
  height: '100%',
};
