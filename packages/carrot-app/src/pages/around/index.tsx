import styled from "styled-components";
import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"
import { useEffect, useState } from "react";
import Button from "@carrot/core/atoms/button";

const AroundPage = () => {
  const [isAppReady, setIsAppReady] = useState(false)
  useEffect(() => {
    window.addEventListener('flutterInAppWebViewPlatformReady', () => {
      setIsAppReady(true);
    })
  })

  const handleClickInput = () => {
    if (!isAppReady) {
      window.flutter_inappwebview.callHandler('keyboardHeight')
        .then((res: any) => alert(JSON.stringify(res)))
    }
  }
  return (
    <Wrapper>
      <StyledButton
        buttonType="CARROT"
        onClick={handleClickInput}
      >
        테스트
      </StyledButton>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType="AROUND" />
    </Wrapper>
    
  )
};

export default AroundPage;

const Wrapper = styled.div`

`

const StyledButton = styled(Button)`
position: absolute;
left: 50%;
bottom: 50%;
`