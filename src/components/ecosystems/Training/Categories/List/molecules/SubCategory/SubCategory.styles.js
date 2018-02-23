import styled from 'styled-components';
import { orange100 } from 'styles/colors';
import { fs20 } from 'styles/typography';

export const SubCategoryWrapper = styled.li`
  align-itens: middle;
  border: 2px solid ${orange100};
  cursor: pointer;
  display: flex;
  height: 140px;
  margin: 0 7px 7px 0;
  position: relative;
  transition: transform 150ms ease-in;

  &:hover {
    transform: scale(1, 1.05);
  }

  @media (min-width: 1224px) {
    width: calc(20% - 7px);
  }

  @media (min-width: 900px) and (max-width: 1224px) {
    width: calc(33% - 7px);
  }

  @media (max-width: 900px) {
    width: calc(50% - 7px);
  }
`;

export const SubCategoryLink = styled.a`
  align-items: center;
  bottom: 0;
  display: flex;
  left: 0;
  padding: 15px;
  position: absolute;
  right: 0;
  text-decoration: none;
  top: 0;
`;

export const SubCategoryTitleWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

export const SubCategoryTitle = styled.div`
  color: ${orange100};
  font-size: ${fs20};
  line-height: 25px;
`;

export const SubCategoryIcon = styled.img`
  display: inline-block;
  width: 30px;
`;
