import styled from 'styled-components';
import { gray890, gray600 } from 'styles/colors';
import { fs32, fs16, RobotoRegular, NaturaSans, fw600 } from 'styles/typography';

export default {
  content: { maxWidth: '700px' },

  title: {
    color: gray890,
    fontSize: 25,
    fontWeight: fw600,
  },

  body: {
    fontSize: 16,
    fontFamily: RobotoRegular,
  },

  label: { fontWeight: fw600 },

  paper: { padding: '5px' },

  loading: {
    background: 'rgba(248,248,248,0.7)',
    zIndex: 999,
  },

  radioButton: { marginBottom: 16 },
  radioButtonLabel: { fontFamily: RobotoRegular },

  inputTextQuestion: {
    height: '50px',
  },
  errorMessage: { color: '#FF5000' },

  progress: { color: gray890, fontSize: 'medium' },
  title: { fontSize: 'big', fontFamily: NaturaSans },

  description: {
    color: gray600,
    fontFamily: RobotoRegular,
    marginBottom: '50px',
    fontSize: 'larger',
  },

  actions: {
    fontFamily: RobotoRegular,
  },
};

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -10px;
`;
