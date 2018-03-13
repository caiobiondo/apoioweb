import styled from 'styled-components';
import { fw600, RobotoRegular } from 'styles/typography';
import { gray100, gray700 } from 'styles/colors';

export const CycleMenuWrapper = styled.div`
  font-family: ${RobotoRegular};
  text-align: center;
`;

export const CycleMenu = styled.ul`
  display: inline-block;
  padding: 2px;
  background: white;
  border-radius: 10px;
  margin-bottom: 60px;
`;

export const CycleMenuItem = styled.li`
  list-style-type: none;
  padding: 12px 18px;
  text-transform: uppercase;
  font-size: 11px;
  color: ${gray700};
  font-weight: ${fw600};
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  ${({ active }) =>
    active &&
    `
    background-color: ${gray100};
  `};
`;
