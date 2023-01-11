import { useRef, useState } from "react";
import styled from "styled-components";

import Option from "./option";
import addIcon from '@carrot/core/assets/icon/add-white.svg';
import closeIcon from '@carrot/core/assets/icon/close.svg'
import theme from "@carrot/core/style/theme";
import { NavType } from "../navBar";
import { useCustomContext } from "../../contexts/etc/customProvider";

interface FloatingButtonProps {
  pageType: NavType;
}

const FloatingButton = (props: FloatingButtonProps) => {

  const [open, setOpen] = useState(false);
  const { scrollTop } = useCustomContext();

  if (props.pageType === 'HOME') {
    return (
      <>
      <Background open={open} onClick={() => setOpen(false)}></Background>
      <ButtonWrapper open={open} scrollTop={scrollTop} onClick={() => setOpen(!open)}>
        <img src={open ? closeIcon : addIcon} alt='addIcon' onClick={() => setOpen(!open)} />
        {scrollTop < 5 && !open ? <span>글쓰기</span> : ''}
      </ButtonWrapper>
      <StyledOption type={props.pageType} open={open}/>
      </>
    )
  }

  else {
    return (
      <>
      <Background open={open} onClick={() => setOpen(false)}></Background>
      <ButtonWrapper open={open} onClick={() => setOpen(!open)}>
        <img src={open ? closeIcon : addIcon} alt='addIcon' onClick={() => setOpen(!open)} />
      </ButtonWrapper>
      <StyledOption type={props.pageType} open={open}/>
      </>
    )
  }
}

export default FloatingButton;
const Background = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
  display: ${props => props.open ? '' : 'none'};
`
const ButtonWrapper = styled.div<{ open: boolean, scrollTop?: number }>`
  position: absolute;
  z-index: 10;
  padding: 0 1.4rem;
  display: flex;
  gap: 1rem;
  width: ${props => props.scrollTop! < 10 && !props.open ? '10.2rem' : '5rem'};
  transition: width 0.2s, background 0.3s;
  height: ${props => props.scrollTop! < 10 && !props.open ? '4.6rem' : '5rem'};
  bottom: 8rem;
  right: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20rem;
  background: ${props => props.open ? 'white' : theme.colors.carrot};

  img {
    width: ${props => props.open ? '2rem' : '2.2rem'};
    height: ${props => props.open ? '2rem' : '2.2rem'};
  }

  span {
    ${theme.typography.body3};
    font-weight: bold;
    color: white;
  }
`
const StyledOption = styled(Option)<{ open: boolean }>`
  display: ${props => props.open ? '' : 'none'}; 
`