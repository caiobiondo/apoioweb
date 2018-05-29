import styled from 'styled-components';
import { gray300, gray900 } from 'styles/colors';
import { RobotoRegular } from 'styles/typography';

export const Header = styled.div`
  margin-bottom: 25px;

  label {
    font-size: 15px;
    color: ${gray300};
  }
  div {
    font-size: 26px;
    color: ${gray900};
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
      color: ${gray900};
      margin-right: 5px;

      &:after {
        content: ':';
      }
    }
    div {
      font-size: 15px;
      color: ${gray300};
    }
  }
`;

export const Status = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

export const Label = styled.label`
  font-family: ${RobotoRegular};
`;
