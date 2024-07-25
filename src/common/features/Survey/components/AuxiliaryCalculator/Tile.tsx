import styled from "styled-components/macro";

export const Tile = styled.div<{ selected?: boolean; className?: string }>`
  position: relative;
  box-sizing: border-box;
  border: none;
  height: 11rem;
  width: 14rem;
  border-radius: 7px;
  padding: 1em;
  margin: 0.5em;
  float: left;
  background-color: ${({ theme, selected }) =>
    selected ? theme.newColors.primary100 : theme.newColors.white100};
  text-align: center;
  color: ${({ theme, selected }) =>
    selected ? theme.newColors.white100 : theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 12rem;
    height: 9rem;
    img {
      width: 170px;
    }
  }
`;
