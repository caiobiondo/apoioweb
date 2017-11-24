import styled from 'styled-components';
import { Paper } from 'natura-ui';

export const Wrapper = styled(Paper)`
  padding: 50px 100px;
  margin: 10px 0;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 10px !important;
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
`;

export const OrderHistoryTitle = styled.h3`
  display: inline;
  font-size: 22px;
  font-weight: 100;
  margin: 5px;
`;

export const OrderHistoryPoints = styled.ul`
  display: block;
  border: 1px solid #eee;
  border-radius: 3px;
  margin: -10px 0 20px;
  padding: 0 10px;
`;

export const OrderHistoryPoint = styled.li`
  display: inline;
  padding: 7px 15px 5px;
  margin: 10px 0;
  float: left;
  border-left: 1px solid #eee;
  text-transform: capitalize;
  color: #888;

  :first-child {
    border-left: none;
  }
`;

export const IconWrapper = styled.figure`
  display: block;
  margin: 8px 0 15px;
  width: 25px;
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
`;
