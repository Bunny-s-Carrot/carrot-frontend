import React, { ForwardedRef } from "react";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";


interface SmallPopupProps {
  content: string[]
}

const SmallPopup = React.forwardRef((props:SmallPopupProps, ref: ForwardedRef<HTMLDivElement> ) => {
  
  return (
    <Wrapper ref={ref}>
      {props.content.map((item, index) => (
        <Content key={index} onClick={() => {}}>
          <span>{item}</span>
        </Content>
      ))}
    </Wrapper>
  )
})

export default SmallPopup;

const Wrapper = styled.div`
  min-width: 50%;
  padding: 0.8rem 0;
  position: absolute;
  background: white;
  top: 1.6rem;
  right: 0.4rem;
  z-index: 10;
  border-radius: 0.4rem;
`
const Content = styled.div`
  padding: 0.8rem 1.6rem;
  ${theme.typography.body3};
`