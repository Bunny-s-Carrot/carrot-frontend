import { ForwardedRef, useRef } from "react";
import styled from "styled-components";
import Button from "@carrot/core/atoms/button";
import theme from "@carrot/core/style/theme";
import React from "react";


interface ModalProps {
  query: string
  onClickLeft: () => void
  onClickRight: () => void
  buttonText: string
}

const Modal = React.forwardRef((props: ModalProps, ref: ForwardedRef<HTMLDivElement>) => {

  return (
    <Background>
      <Wrapper ref={ref}>
        <Query>
          <span>{props.query}</span>
        </Query>
        <ButtonWrapper>
          <StyledButton
            buttonType="WHITE"
            onClick={props.onClickLeft}
          >
            취소
          </StyledButton>
          <StyledButton
            buttonType="CARROT"
            onClick={props.onClickRight}
          >
            {props.buttonText}
            </StyledButton>
        </ButtonWrapper>
      </Wrapper>
    </Background>
    
  )
})

export default Modal;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  overflow-y: hidden;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
`
const Wrapper = styled.div`
  width: 80%;
  padding: 2.4rem;
  background: white;
  position: absolute;
  border-radius: 0.8rem;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
const Query = styled.div`
  width: 100%;
  text-align: center;
  span {
    ${theme.typography.body3};
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledButton = styled(Button)`
  width: 48%;
  height: 3.6rem;
  ${theme.typography.body3};
  font-weight: bold;
`