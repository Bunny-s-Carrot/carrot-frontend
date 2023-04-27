import { useRef, useLayoutEffect, useMemo } from 'react'
import theme from "@carrot/core/style/theme";
import { useState } from 'react';
import styled from "styled-components";
import { getTouchEventData } from '../../infra/dom';
import { getArea1, getArea2, setArea1, setArea2 } from '../../infra/location/locationData';
import { debounce, throttle } from 'lodash';



interface SliderProps {
  initial: number
  min: number
  max: number
  activeLocation: number
}
const Slider = (props: SliderProps) => {
  const [isTouching, setIsTouching] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const getPercentage = useMemo(() => (current: number, min: number, max: number) => 
  ((current - min) / (max - min)) * 100, []);
  
  const initialPercentage = getPercentage(props.initial, props.min, props.max);
  
  const getLeft = useMemo(() => (percentage: number) => `calc(${percentage}% - 1.2rem)`, []);
  
  const handleSetPosition = useMemo(() => debounce((percentage: number) => {
    if (percentage >= 0 && percentage < 16) {
      thumbRef.current!.style.left = getLeft(0);
      props.activeLocation === 0 ? getArea1() !== 0 && setArea1(0) : getArea2() !== 0 && setArea2(0);
    } else if (percentage >= 16 && percentage < 50) {
      thumbRef.current!.style.left = getLeft(33);
      props.activeLocation === 0 ? getArea1() !== 1 && setArea1(1) : getArea2() !== 1 &&setArea2(1);
    } else if (percentage >= 50 && percentage < 83) {
      thumbRef.current!.style.left = getLeft(66);
      props.activeLocation === 0 ? getArea1() !== 2 && setArea1(2) : getArea2() !== 2 && setArea2(2);
    } else {
      thumbRef.current!.style.left = getLeft(100);
      props.activeLocation === 0 ? getArea1() !== 3 && setArea1(3) : getArea2() !== 3 && setArea2(3);
    }
    
  }, 300), [props.activeLocation, getLeft]);

  const getNewPercentage = useMemo(() => throttle((e: MouseEvent | TouchEvent) => {
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
  }, 1000), [getPercentage]);

  const handleClickThumbMove = (e: any) => {
    handleSetPosition(getNewPercentage(e)!)
  }

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const newPercentage = getNewPercentage(e);
    thumbRef.current!.style.left = getLeft(newPercentage!);
    setIsTouching(true);
  };

  const handleMouseUp = (e: MouseEvent | TouchEvent) => {
    const newPercentage = getNewPercentage(e);

    handleSetPosition(newPercentage!);
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
  transition: ${props => props.isTouching ? '' : 'left 0.7s ease'};
  background: ${theme.colors.carrot};
  cursor: pointer;
  box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.3);
`