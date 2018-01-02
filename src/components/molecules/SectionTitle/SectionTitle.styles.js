import styled from 'styled-components';
import { fs18 } from 'styles/typography';
import { gray890, orange100 } from 'styles/colors';

export const SectionTitleWrapper = styled.div`
  display: flex;

  align-items: center;
  vertical-align: middle;
  font-size: ${fs18};
  color: ${props => props.color || gray890};
  margin-bottom: ${props => {
    return props.expanded === false ? 0 : '30px';
  }};
  position: relative;

  svg {
    margin-right: 20px;
    display: inline-block;

    fill: ${props => props.svgFill || orange100};
    height: 20px;
    width: 20px;
  }
`;

export const Title = styled.div`
  flex: 1;
`;

export const ExpandableIconWrapper = styled.div`
  svg {
    margin-right: 0;
  }
`;

export const ExpandableIconButton = {
  width: 36,
  height: 36,
  padding: 0,
};

export const ExpandableIcon = {
  width: 72,
  height: 72,
  padding: 16,
};
