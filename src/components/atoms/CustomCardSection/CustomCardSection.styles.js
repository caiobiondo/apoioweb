import styled from 'styled-components';
import { gray100 } from 'styles/colors';

export const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  margin-left: 40px;
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};

  &:not(:last-child) {
    border-bottom: 1px solid ${gray100};
  }

  @media (min-width: 1024px) {
    padding: 10px 50px;
    margin-left: 0;
    width: 100%;

    &:not(:last-child) {
      border-bottom: none;
      border-right: 1px solid ${gray100};
    }
  }
`;
