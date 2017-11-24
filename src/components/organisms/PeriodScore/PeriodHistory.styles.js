import styled from 'styled-components';

export const Wrapper = {
  borderRadius: '10px',
  padding: '50px 100px',
  margin: '10px 0',
  boxShadow: '0 0 25px 0 rgba(0,0,0,0.1)',
};

export const TableStyle = {
  background: 'none',
};

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
  width: 30px;
`;
