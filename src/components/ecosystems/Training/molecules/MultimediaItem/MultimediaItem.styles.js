import styled from 'styled-components';
import { white, orange100, gray100, gray200 } from 'styles/colors';
import { Responsive } from '@entria/components';
import { RobotoRegular, fs18, fs19 } from 'styles/typography';

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

export const MultimediaItemDescriptionViews = styled.div`
  display: block;
  font-family: ${RobotoRegular};
  color: ${gray200};
  font-size: ${fs18};
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

export const MultimediaItemThumbnailPlayWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const MultimediaItemThumbnailPlay = styled.div`
  border-radius: 50%;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0.6);
  width: 65px;
  height: 65px;
  position: relative;

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-left: 15px solid white;
    border-bottom: 15px solid transparent;
    position: absolute;
    top: 29%;
    right: 35%;
  }
`;

export const MultimediaItemThumbnailPlayBackground = styled.div`
  border-radius: 50%;
  border: 1px solid rgba(black, 0.6);
`;

export const MultimediaItemThumbnailDurationWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 21px;
  font-family: Roboto-Regular;
  border-radius: 2.5px;
  padding: 8px;
`;

export const MultimediaItemThumbnailStoppedAt = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  background-color: ${orange100};
  height: 5px;
  width: ${props => {
    return props.width ? props.width : '0%';
  }};
`;

export const MultimediaItemThumbnailCompletedWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
`;

export const MultimediaItemThumbnailCompleted = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 21px;
  font-family: Roboto-Regular;
  border-radius: 2.5px;
  padding: 8px;
`;

export const MultimediaItemIconWrapper = styled.div`
  margin-right: 15px;

  svg {
    height: 20px;
    fill: ${orange100};
  }
`;

export const MultimediaItemMenu = styled.div`
  display: block;
  position: absolute;
  top: 12px;
  right: 12px;
`;
