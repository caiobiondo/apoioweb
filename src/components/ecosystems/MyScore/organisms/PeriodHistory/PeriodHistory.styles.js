import styled from 'styled-components';
import { fs12 } from 'styles/typography';
import { gray300 } from 'styles/colors';
import { Paper } from 'natura-ui';
import { Responsive } from '@entria/components';

export const Wrapper = styled(Paper)`
  padding: 50px 100px;
  margin: 10px 0;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 10px !important;

  min-height: 200px;
  > div {
    border-radius: 10px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: 0 -15%;
    padding: 20px;
  }
`;

export const PageTitle = styled.h1`
  color: #f3971f;
  font-family: Roboto-Light;
  font-size: 21px;
  font-weight: 300;
  line-height: 1.19;
  text-align: left;
`;

export const OrderHistoryHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const OrderHistoryTitle = styled.h3`
  display: inline;
  font-size: 22px;
  font-weight: 100;
  margin: 5px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    align-self: flex-start;
    font-size: 18px;
  }
`;

export const OrderHistoryPoint = styled.li`
  display: inline;
  padding: 7px 15px 5px;
  margin: 10px 0;
  float: left;
  border-left: 1px solid #eee;
  text-transform: capitalize;
  color: #888;
  font-size: ${fs12};

  :first-child {
    border-left: none;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: flex;
    margin: 0;
    padding: 10px;
    align-items: center;
  }
`;

export const OrderHistoryPoints = styled.ul`
  display: block;
  border: 1px solid #eee;
  border-radius: 3px;
  margin: -10px 0 20px;
  padding: 0 10px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: flex;
    align-self: flex-start;
    margin: 20px 0 0 0;

    ${OrderHistoryPoint}:first-child {
      padding-left: 0;
    }

    ${OrderHistoryPoint}:last-child {
      padding-right: 0;
    }
  }
`;

export const OrderHistoryPointLabel = styled.div`
  svg {
    fill: ${gray300};
    display: none;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-right: 10px;

    span:first-of-type {
      display: none;
    }

    svg {
      display: inline-block;
      width: 15px;
    }
  }
`;

export const IconWrapper = styled.figure`
  display: block;
  margin: 8px 0 15px;
  width: 25px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: 0;

    svg {
      width: 15px;
    }
  }
`;

export const CloseButton = styled.a`
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 27px;
  display: block;

  svg {
    height: 24px;
    width: 24px;
    fill: #000;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    svg {
      height: 12px;
      width: 12px;
    }
  }
`;

export const TableWrapper = styled.div`
  td {
    font-size: 13px !important;
  }
`;

export const TableDataWrapper = styled.div`
  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    > span:first-child {
      display: none;
    }
  }
`;
