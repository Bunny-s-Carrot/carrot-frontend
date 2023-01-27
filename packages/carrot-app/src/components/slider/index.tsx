import { ChangeEventHandler, useRef, useLayoutEffect, useCallback } from 'react'
import theme from "@carrot/core/style/theme";
import { useState } from 'react';
import styled from "styled-components";
import { getTouchEventData } from '../../infra/dom';
import { useCustomContext } from '../../contexts/etc/customProvider';

const getPercentage = (current: number, min: number, max: number) => 
  ((current - min) / (max - min)) * 100;
const getLeft = (percentage: number) => `calc(${percentage}% - 1.2rem)`;

interface SliderProps {
  initial: number
  min: number
  max: number
  onChange: ChangeEventHandler<HTMLDivElement>
}
const Slider = (props: SliderProps) => {
  const [isTouching, setIsTouching] = useState(false);
  const initialPercentage = getPercentage(props.initial, props.min, props.max);
  const dotRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const { setArea } = useCustomContext();

  const handleSetPosition = useCallback((percentage: number) => {
    if (percentage >= 0 && percentage < 16) {
      thumbRef.current!.style.left = getLeft(0);
      setArea(0);
    } else if (percentage >= 16 && percentage < 50) {
      thumbRef.current!.style.left = getLeft(33);
      setArea(1);
    } else if (percentage >= 50 && percentage < 83) {
      thumbRef.current!.style.left = getLeft(66);
      setArea(2);
    } else {
      thumbRef.current!.style.left = getLeft(100);
      setArea(3);
    }
    
  }, [setArea]);

  const getNewPercentage = useCallback((e: MouseEvent | TouchEvent) => {
    let newX = getTouchEventData(e).clientX - sliderRef.current?.getBoundingClientRect().left!;

    const end = sliderRef.current!.offsetWidth - thumbRef.current!.offsetWidth;
    const start = 0;
    if (newX < start) {
      newX = 0;
    }
    if (newX > end) {
      newX = end;
    }

    return getPercentage(newX, start, end);
  }, []);

  const handleClickThumbMove = (e: any) => {
    handleSetPosition(getNewPercentage(e))
  }

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const newPercentage = getNewPercentage(e);
    thumbRef.current!.style.left = getLeft(newPercentage);
    setIsTouching(true);
  };

  const handleMouseUp = (e: MouseEvent | TouchEvent) => {
    const newPercentage = getNewPercentage(e);

    handleSetPosition(newPercentage);
    window.removeEventListener('touchmove', handleMouseMove);
    window.removeEventListener('touchend', handleMouseUp);
    setIsTouching(false);
  };

  const handleMouseDown = () => {
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
  };

  useLayoutEffect(() => {
    handleSetPosition(initialPercentage);
  }, [initialPercentage, handleSetPosition])

  return (
    <SliderWrapper ref={sliderRef}>
      <SliderDots
        ref={dotRef}
        onClick={handleClickThumbMove}
      >
        <div />
        <div />
        <div />
        <div />
      </SliderDots>
      <SliderThumb
        ref={thumbRef}
        onTouchStart={handleMouseDown}
        onTouchEnd={() => handleMouseUp}
        getLeft={getLeft}
        initialPercentage={initialPercentage}
        isTouching={isTouching}
      />
    </SliderWrapper>
  )
}

export default Slider

const SliderWrapper = styled.div`
  width: 96%;
  margin: 0 auto;
  position: relative;
  border-radius: 2rem;
  background: ${theme.colors.grey30};
  height: 0.5rem;
`
const SliderDots = styled.div`
  width: 103%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  div {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background: ${theme.colors.grey30};
  }
`
const SliderThumb = styled.div<{ getLeft: any, initialPercentage: number, isTouching: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  position: relative;
  top: -0.9rem;
  left: ${props => props.getLeft(props.initialPercentage)};
  transition: ${props => props.isTouching ? '' : 'left 0.3s ease'};
  background: ${theme.colors.carrot};
  cursor: pointer;
  box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.3);
`