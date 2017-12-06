import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray150, gray200, gray700, gray890, orange100 } from 'styles/colors';
import { fs10, fs16, fs32, NaturaBold, RobotoRegular } from 'styles/typography';
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
`;

export const CustomerAvatarStyle = {
  backgroundColor: orange100,
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

export const CustomerName = styled.div`
  font-family: ${NaturaBold};
  font-size: ${fs32};
  color: ${gray890};
  margin-bottom: 10px;

  flex: 1 1 100%;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-basis: auto;
  }
`;

export const CustomerDatumTelephone = styled.div`
  display: flex;
  flex: 0 1 auto;
`;

export const CustomerDatumTelephoneNumber = styled.div`
  flex: 1 1 50%;
  margin-bottom: 10px;
`;

export const CustomerDatumTelephoneProvider = styled.div`
  flex: 1 1 50%;
  margin-bottom: 10px;
  color: ${gray700};
`;

export const CustomerDataTelephones = styled.div`
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-basis: auto;
  }
`;

export const CustomerDataAddresses = styled.div`
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;
  margin-bottom: 32px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-basis: auto;
  }
`;

export const CustomerDataTitle = styled.div`
  font-family: ${NaturaBold};
  color: ${orange100};
  font-size: ${fs16};
  flex: 0 1 auto;

  margin-bottom: 25px;
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
