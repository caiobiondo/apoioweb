import styled from 'styled-components';
import { RobotoLight } from 'styles/typography';

export const Wrapper = styled.div``;

export const Title = styled.h3`
  color: #f3971f;
  margin-bottom: 49px;
  font-family: ${RobotoLight};
  font-size: 21px;
  font-weight: 100;
`;

export const ZipCodeSearchLink = styled.a`
  text-align: right;
  color: rgba(243, 151, 31, 0.8);
`;

export const NumberRow = styled.div`
  display: flex;

  & > * {
    display: inline-block;
  }

  & > *:first-child {
    margin-right: 10%;
    width: 20%;
  }

  & > *:last-child {
    margin-right: 0;
    width: 70%;
  }
`;

export const CityRow = styled.div`
  display: flex;

  & > * {
    display: inline-block;
  }

  & > *:first-child {
    margin-right: 10%;
    width: 60%;
  }

  & > *:last-child {
    margin-right: 0;
    width: 30%;
  }
`;
