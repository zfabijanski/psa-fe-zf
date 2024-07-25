import styled from "styled-components/macro";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 4px solid ${({ theme }) => theme.colors.lightGray};
  margin-left: 20px;
`;

export default TabsContainer;
