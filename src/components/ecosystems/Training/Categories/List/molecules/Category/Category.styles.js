import styled from 'styled-components';
import { gray200, orange100 } from 'styles/colors';
import { fw600, fs10, fs20 } from 'styles/typography';

export const CategoryWrapper = styled.div`
  margin-bottom: 70px;
`;

export const CategoryTitleHolder = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

export const CategoryIcon = styled.img`
  left: 0;
  position: absolute;
  top: 0;
  width: 16px;
`;

export const CategoryTitle = styled.h3`
  display: inline-block;
  margin: 0;
  padding: 0 20px 0 30px;
  font-size: ${fs20};
`;

export const ViewAll = styled.span`
  border-left: 2px solid ${gray200};
  line-height: 19px;
  padding-left: 20px;
  vertical-align: middle;
`;

export const ViewAllLink = styled.div`
  display: inline-block;

  > a {
    color: ${orange100};
    font-size: ${fs10};
    font-weight: ${fw600};
    text-transform: uppercase;
  }
`;

export const List = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;
