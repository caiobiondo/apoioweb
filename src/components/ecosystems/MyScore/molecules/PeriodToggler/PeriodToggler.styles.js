import styled from 'styled-components';

export const WrapperStyles = {
  borderRadius: '10px',
  color: 'rgba(84, 84, 84, 0.4)',
  height: '30px',
  display: 'flex',
  marginTop: '27px',
  marginBottom: '45px',
};

export const Button = styled.a`
  font-size: 13.3px;
  line-height: 30px;
  display: inline-block;
  font-family: Lato-Regular;
  border-radius: 10px;
  cursor: pointer;
  flex: 1 1 50%;
  display: flex;
  justify-content: center;

  > span {
    align-self: center;
  }
`;

export const ActiveButton = Button.extend`
  background-color: #444;
  color: #fff;
`;
