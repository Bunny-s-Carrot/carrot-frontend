import styled from "styled-components";
import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"

const AroundPage = () => {

  return (
    <Wrapper>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType="AROUND" />
    </Wrapper>
    
  )
};

export default AroundPage;

const Wrapper = styled.div`

`