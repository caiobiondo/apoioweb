import styled from 'styled-components';
import { getTheme, Responsive } from '@entria/components';
import { gray100, gray150, white } from 'styles/colors';
import { fs20, fs26, fw700, NaturaBold } from 'styles/typography';

export const ContentWrapper = styled.div`
  margin-bottom: 25px;

  .video-react .video-react-play-progress {
    background: ${getTheme().palette.primary1Color};
  }
`;

/* eslint-disable no-confusing-arrow */
export const TrainingCourseThumbnail = styled.div`
  position: relative;
  background-color: ${gray100};
  background-image: url(${props => (props.imageUrl ? props.imageUrl : '')});
  background-repeat: no-repeat;
  background-size: cover;
  height: 560px;
  border-radius: 4px;

  &:before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
    border-radius: 4px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    height: 250px;
  }
`;
/* eslint-enable no-confusing-arrow */

export const TrainingCourseThumbnailDescriptionWrapper = styled.div`
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${white};
  padding: 15px;
`;

export const TrainingCourseTitle = styled.div`
  font-size: ${fs26};
  font-family: ${NaturaBold};
  font-weight: ${fw700};
  position: relative;
  text-align: center;
  margin-bottom: 30px;
  flex: 0 1 auto;
  color: ${gray150};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: ${fs20};
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 25px;
  display: inline-block;

  svg {
    height: 81.5px;
    width: 93px;
    fill: ${gray150};
  }

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    svg {
      height: 71.5px;
      width: 83px;
    }
  }
`;

export const PlayerWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  width: 100%;
  overflow: hidden;

  iframe, object, embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
`;
