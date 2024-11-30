import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 100%;
  height: 700px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px ${(props) => props.theme.colors.shadeOfGrey};
  box-sizing: border-box;
`;
export const Title = styled.h1`
  text-align: center;
  font-size: 20px;
`;
export const TooltipStyle = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.colors.primaryWhite};
  border-radius: 6px;
  box-shadow: 0 4px 8px ${(props) => props.theme.colors.shadeOfGrey};
  font-size: 14px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
export const Button = styled.button<{ disabled: boolean }>`
  width: 250px;
  height: 40px;
  outline: 0;
  align-items: center;
  background: ${(props) =>
          props.disabled ? props.theme.colors.buttonDisabled : props.theme.colors.buttonGreen};
  border: 2px solid ${(props) =>
          props.disabled ? props.theme.colors.buttonDisabled : props.theme.colors.buttonGreen};
  color: ${(props) => (props.disabled ? props.theme.colors.primaryGray : props.theme.colors.primaryWhite)};
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  flex-shrink: 0;
  gap: 8px;
  justify-content: center;
  line-height: 1.5;
  overflow: hidden;
  padding: 12px 16px;
  text-decoration: none;
  text-overflow: ellipsis;
  transition: all .14s ease-out;

  &:hover {
    box-shadow: 4px 4px 0 ${(props) => props.theme.colors.primaryBlack};
    transform: translate(-4px, -4px);
  }

  &:focus {
    outline-offset: 1px;
  }
`
export const FieldInformation = styled.p`
  font-size: 14px;
`
