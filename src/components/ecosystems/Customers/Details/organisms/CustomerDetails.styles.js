import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray150, gray700, gray890, orange100 } from 'styles/colors';
import { fs16, fs32, NaturaBold, RobotoRegular } from 'styles/typography';
import { spMedium, spPage } from 'styles/spacing';

import { SectionTitleWrapper } from 'components/molecules/SectionTitle/SectionTitle.styles';

export const Main = styled.div`
  margin: ${spMedium} ${spPage} ${spMedium} ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }
`;

export const CustomerDetailsWrapper = {
  padding: '30px',
  marginBottom: spMedium,
};

export const CustomerDetailsSectionTitleWrapper = styled.div`
  ${SectionTitleWrapper} {
    margin-bottom: 54px;
  }
`;

export const CustomerDetailsData = styled.div`
  display: flex;
  margin: 0 100px 72px 100px;
  font-family: ${RobotoRegular};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: 0 64px 36px 64px;
    flex-direction: column;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: 0;
  }
`;

export const CustomerAvatarWrapper = styled.div`
  flex: 0 1 auto;
  margin-right: 45px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-right: 0;
    text-align: center;
  }
`;

export const CustomerAvatarStyle = {
  backgroundColor: orange100,
  textTransform: 'uppercase',
};

export const CustomerDataWrapper = styled.div`
  flex: 1 1 auto;
`;

export const CustomerData = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &:first-of-type {
    margin: 20px 0;
    justify-content: flex-start;
  }

  &:first-of-type + & {
    border-top: 1px solid ${gray150};
  }

  & + & {
    padding-top: 30px;
    border-top: 1px dotted ${gray150};
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const CustomerNameWrapper = styled.div`
  font-family: ${NaturaBold};
  font-size: ${fs32};
  color: ${gray890};
  margin-bottom: 10px;

  flex: 1 1 100%;
  display: flex;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-basis: auto;
    justify-content: center;
  }
`;

export const CustomerName = styled.div`
  flex: 0 1 auto;
  margin-right: 15px;
`;

export const CustomerEditWrapper = styled.div`
  flex: 0 1 auto;

  svg {
    fill: ${gray890};
    width: 13px;
  }
`;

export const CustomerDatumTelephone = styled.div`
  display: flex;
  flex: 0 1 auto;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    justify-content: center;
  }
`;

export const CustomerDatumTelephoneNumber = styled.div`
  flex: 1 1 50%;
  margin-bottom: 10px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: flex;
    justify-content: center;
  }
`;

export const CustomerDatumTelephoneProvider = styled.div`
  flex: 1 1 50%;
  margin-bottom: 10px;
  color: ${gray700};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: flex;
    justify-content: center;
  }
`;

export const CustomerDataTelephones = styled.div`
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-basis: auto;
    justify-content: center;
    margin-bottom: 32px;
  }
`;

export const CustomerDataAddresses = styled.div`
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;
  margin-bottom: 32px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-basis: auto;
    justify-content: center;
  }
`;

export const CustomerDatumAddress = styled.div`
  & + & {
    margin-top: 20px;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    display: flex;
    justify-content: center;
  }
`;

export const CustomerDataTitle = styled.div`
  font-family: ${NaturaBold};
  color: ${orange100};
  font-size: ${fs16};
  flex: 0 1 auto;

  margin-bottom: 25px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    padding-left: 12px;
  }
`;

export const CustomerDatumHalfWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 1 50%;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
    flex-basis: auto;
  }
`;

export const CustomerDatumNotes = styled.div`
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-basis: auto;
  }
`;
