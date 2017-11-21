import styled from 'styled-components';
import { fs18 } from 'styles/typography';
import { gray890, orange100 } from 'styles/colors';

export const SectionTitleWrapper = styled.div`
  display: flex;

  vertical-align: middle;
  font-size: ${fs18};
  color: ${props => props.color || gray890};
  margin-bottom: 30px;

  svg {
    margin-right: 20px;
    display: inline-block;

    fill: ${props => props.svgFill || orange100};
    height: 20px;
    width: 20px;
  }
`;
