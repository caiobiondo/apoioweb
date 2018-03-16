import styled from 'styled-components';
import { fw600, RobotoRegular } from 'styles/typography';
import { gray100, gray700 } from 'styles/colors';

export const CycleMenuWrapper = styled.div`
  font-family: ${RobotoRegular};
  text-align: center;
`;

export const CycleMenu = styled.ul`
  background: white;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 60px;
  padding: 2px;
`;

export const CycleMenuItem = styled.li`
  border-radius: 10px;
  color: ${gray700};
  cursor: pointer;
  display: inline-block;
  font-size: 11px;
  font-weight: ${fw600};
  list-style-type: none;
  padding: 12px 18px;
  text-transform: uppercase;
  transition: background-color 0.3s ease-in;

  ${({ active }) =>
    active &&
    `
    background-color: ${gray100};
  `};
`;
