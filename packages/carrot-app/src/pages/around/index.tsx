import styled from "styled-components";
import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"
import Button from "@carrot/core/atoms/button";
import useAroundViewModel from "./around.viewModel";

const Around = () => {
  const aroundViewModel = useAroundViewModel();
  return (
    <Wrapper>
      <StyledButton
        buttonType="CARROT"
        onClick={aroundViewModel.handleClickInput}
      >
        테스트
      </StyledButton>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType="AROUND" />
    </Wrapper>
    
  )
};

export default Around;

const Wrapper = styled.div`

`

const StyledButton = styled(Button)`
position: absolute;
left: 50%;
bottom: 50%;
`