import styled from 'styled-components';
import { gray700 } from 'styles/colors';
import { RobotoRegular } from 'styles/typography';

export const PopoverStyles = {
  color: gray700,
  fontSize: '14px',
  maxWidth: '250px',
  overflow: 'visible',
  padding: '20px',
  fontFamily: RobotoRegular,
  lineHeight: '24px',
};

export const PopoverContent = styled.div`
  position: relative;
  text-align: center;
`;
