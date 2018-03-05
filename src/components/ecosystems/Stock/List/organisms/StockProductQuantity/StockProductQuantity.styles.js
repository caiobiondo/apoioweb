import styled from 'styled-components';
import { successGreen, orange100, white } from 'styles/colors';
import { fs9, RobotoRegular } from 'styles/typography';

export const Wrapper = styled.span``;

const SubmittedMessage = styled.div`
  text-align: center;
  font-family: ${RobotoRegular};
  font-size: ${fs9} !important;
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  width: 100px;
  border: 1px solid #ccc;
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  text-transform: uppercase;

  & svg {
    width: 5px;
    margin-bottom: 1px;
    margin-right: 5px;
  }
`;

export const SubmittedRemovedMessage = SubmittedMessage.extend`
  color: ${orange100};

  & svg {
    fill: ${orange100};
  }
`;

export const SubmittedAddedMessage = SubmittedMessage.extend`
  color: ${successGreen};

  & svg {
    fill: ${successGreen};
  }
`;

export const submitButtonStyles = {
  labelStyle: {
    textTransform: 'uppercase',
    fontFamily: RobotoRegular,
    fontSize: fs9,
    fontWeight: 'bold',
  },
  buttonStyle: {
    color: white,
    minWidth: 102,
    width: 102,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  overlayStyle: {
    minWidth: 102,
    width: 102,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  height: 25,
};
