import styled from 'styled-components';
import { white, orange100, gray100 } from 'styles/colors';
import { Responsive } from '@entria/components';
import { fs19 } from 'styles/typography';

export const MultimediaItemWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 510px;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
    width: auto;
  }

  @media (min-width: 1000px) and (max-width: 1500px) {
    flex-basis: 50%;
  }

  @media (min-width: 1500px) {
    flex-basis: 33%;
  }
`;

export const MultimediaItemPaper = styled.div`
  box-shadow: 0px 2.5px 2.4px 0.1px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  min-height: 280px;
  background-color: ${white};
  margin: 10px 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MultimediaItemDescriptionWrapper = styled.div`
  padding: 25px;
  display: flex;
  position: relative;
`;

export const MultimediaItemDescription = styled.div`
  display: inline-block;
  padding-right: 35px;
  cursor: pointer;
`;

export const MultimediaItemDescriptionTitle = styled.div`
  display: block;
  font-size: ${fs19};
  margin-bottom: 5px;
`;

export const MultimediaThumbnail = styled.div`
  position: relative;
  height: 200px;
  background-color: ${gray100};
  cursor: pointer;

  > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    img {
      object-fit: cover;
      max-height: 200px;
      width: 100%;
    }

    svg {
      height: 40px;
    }
  }
`;

export const MultimediaItemIconWrapper = styled.div`
  margin-right: 15px;

  svg {
    height: 20px;
    fill: ${orange100};
  }
`;
