import styled from 'styled-components';

export const Header = styled.div`
  margin-bottom: 25px;

  label {
    font-size: 15px;
    color: #8e8e8e;
  }
  div {
    font-size: 26px;
    color: #222;
    margin-top: 5px;
  }
`;

export const Body = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  > div {
    width: 100%;
    padding: 5px 0px;
    label,
    div {
      display: inline-block;
    }
    label {
      font-size: 16px;
      color: #232323;
      margin-right: 5px;

      &:after {
        content: ':';
      }
    }
    div {
      font-size: 15px;
      color: #8e8e8e;
    }
  }
`;

export const Status = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 30px;
`;
