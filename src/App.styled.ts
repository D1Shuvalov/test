import styled from "styled-components";
import {Spin} from "antd";

export const WrapperContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 2rem;
`;
export const Spinner = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
