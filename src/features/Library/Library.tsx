import styled from "styled-components";
import Sidebar from "./Sidebar";
import Viewer from "./Viewer";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Library = () => {
  return (
    <Container>
      <Sidebar />
      <Viewer />
    </Container>
  );
};

export default Library;
