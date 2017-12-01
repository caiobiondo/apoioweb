import styled from 'styled-components';

export const WrapperStyles = {
  borderRadius: '10px',
  color: 'rgba(84, 84, 84, 0.4)',
  height: '30px',
  display: 'inline-block',
  marginTop: '27px',
  marginBottom: '45px',
};

export const Button = styled.a`
  font-size: 13.3px;
  line-height: 30px;
  display: inline-block;
  width: 133px;
  font-family: Lato-Regular;
  border-radius: 10px;
  cursor: pointer;
`;

export const ActiveButton = Button.extend`
  background-color: #444;
  color: #fff;
`;
