import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  margin: 20px 0;
`;
export const SelectWrapper = styled.div`
  .ant-select {
    text-align: center;
    border: 1px solid ${(props) => props.theme.colors.shadeOfGrey};
    border-radius: 8px;
  }

  .ant-select-selector {
    border: none;
    box-shadow: none;
  }

  .ant-select-arrow {
    color: ${(props) => props.theme.colors.primaryBlack};
  }
`