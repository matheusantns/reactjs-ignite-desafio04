import styled from 'styled-components';

interface FocusAndFillProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

    ${({ isFocused }:FocusAndFillProps) => isFocused && `
      color: #ff9000;
      border-color: #ff9000;
  `}

    ${({ isFilled }:FocusAndFillProps) => isFilled && `
      color: #ff9000;
  `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;

    &::placeholder {
      color: #b7b7cc;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
