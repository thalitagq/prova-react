import styled from "styled-components";
import Footer from "./UI/Footer";
import Navbar from "./UI/Navbar";

const Container = styled.div`
  /* min-height: 100vh; */
`;

const Wraper = styled.div`
  padding: 2rem;
  min-height: 83vh;
`;

const Layout: React.FC = (props) => {
  return (
    <Container>
      <Navbar />
      <Wraper>{props.children}</Wraper>
      <Footer />
    </Container>
  );
};

export default Layout;
