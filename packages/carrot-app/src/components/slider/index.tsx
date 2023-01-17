import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { useCustomContext } from "../../contexts/etc/customProvider"
import theme from "@carrot/core/style/theme";


const Slider = () => {
  const { area, setArea } = useCustomContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeSlider = () => {
    const value = parseFloat(inputRef.current!.value)
    if (value < 0.5) {
      setArea(0)
    } else if (value >= 0.5 && value < 1.5) {
      setArea(1)
    } else if (value >= 1.5 && value < 2.5) {
      setArea(2)
    } else { 
      setArea(3)
    }
  }

  return (
    <Wrapper>

      <InputWrapper inputValue={area}>
        <div></div>
        <div></div>
        <div></div>
        <input
          ref={inputRef}
          type='range' 
          min='0'
          max='3'
          step='0.01'
          value={area}
          onChange={() => setArea(parseFloat(inputRef.current!.value))}
          onMouseDown={handleChangeSlider}
          onTouchEnd={handleChangeSlider}
        />
      </InputWrapper>
      <LabelText>
        <span>가까운 동네</span>
        <span>먼 동네</span>
      </LabelText>
    </Wrapper>
  )
}

export default Slider;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  padding: 1rem 0;
`
const InputWrapper = styled.div<{ inputValue: number }>`
  width: 97%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  position: relative;

  div {
    width: 32%;
    height: 0.5rem;
    background: black;
    position: relative;

    :first-of-type {
      border-radius: 2rem 0 0 2rem;
      background: ${props => 
        `linear-gradient(to right, ${theme.colors.carrot} 0%, ${theme.colors.carrot} ${props.inputValue * 100}%, ${theme.colors.grey30} ${props.inputValue * 100}%, ${theme.colors.grey30} 100%)`
      }
    }

    :nth-of-type(2) {
      background: ${props => `linear-gradient(to right, ${theme.colors.carrot} 0%, ${theme.colors.carrot} ${(props.inputValue -1) * 100}%, ${theme.colors.grey30} ${(props.inputValue -1) * 100}%, ${theme.colors.grey30} 100%)`
      }
    }

    :last-of-type {
      border-radius: 0 2rem 2rem 0;
      background: ${props => 
        `linear-gradient(to right, ${theme.colors.carrot} 0%, ${theme.colors.carrot} ${(props.inputValue - 2) * 100}%, ${theme.colors.grey30} ${(props.inputValue - 2) * 100}%, ${theme.colors.grey30} 100%)`
      }
    }
  }

  input[type="range"] {
    width: calc(100% + 1rem);
    height: 0.5rem;
    position: absolute;
    top: -0.3rem;
    -webkit-appearance: none;
    background: transparent;
    

    :focus {
      outline: none;
    }
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    background: white;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.4);
    transition: 1s ease;
  }
`
const LabelText = styled.div`
  width: 100%;
  display: flex;
  padding: 1.6rem 0;
  justify-content: space-between;
  font-size: 1.3rem;
`