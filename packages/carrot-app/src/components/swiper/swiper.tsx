import { useRef, useState } from "react";
import styled from "styled-components";
import SwiperItem from "./swiperItem";
import { getRefValue, useStateRef } from "../../hooks/useSwiper";
import { getTouchEventData } from "../../infra/dom";
import theme from "@carrot/core/style/theme";

interface SwiperProps {
  items: Array<string>
}

const MIN_SWIPE_REQUIRED = 80;

const Swiper = (props: SwiperProps) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const minOffsetXRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    setIsSwiping(true);
    currentOffsetXRef.current = getRefValue(offsetXRef);
    startXRef.current = getTouchEventData(e).clientX;
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);

    const containerEl = getRefValue(containerRef);

    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;
  } 

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;
    
    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  }

  const onTouchEnd = () => {
    const currentOffsetX = getRefValue(currentOffsetXRef);
    const containerWidth = getRefValue(containerRef).offsetWidth;
    let newOffsetX = getRefValue(offsetXRef);
    
    const diff = currentOffsetX - newOffsetX;

    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
      } else {
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
      }
    } else {
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX);
    setCurrentIndex(Math.abs(newOffsetX / containerWidth));

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
  }

  return (
    <Wrapper
      onTouchStart={onTouchStart}
      offsetX={offsetX}
      isSwiping={isSwiping}
    >
      <ul ref={containerRef}>
        {props.items.map((item, index) => (
          <SwiperItem key={index} imgSrc={item} />
        ))}
      </ul>
      <SwiperIndicator>
        {props.items.map((_item, index) => (
          <IndecarotItem
            key={index}
            active={currentIndex === index}
          />
        ))}
      </SwiperIndicator>
    </Wrapper>
  )
}

export default Swiper;

const Wrapper = styled.div<{ offsetX: number, isSwiping: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  touch-action: pan-y;

  ul: first-child {
    min-width: 100%;
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
    transform: ${props => `translate3d(${props.offsetX/10}rem, 0, 0)`};
    transition: ${props => props.isSwiping ? '' : 'transform 0.3s ease-out'};
  }
`
const SwiperIndicator = styled.ul`
  position: absolute;
  bottom: 1.2rem;
  left: 50%;
  transform:translateX(-50%);
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  list-style: none;
  margin: 1.5rem 0 0 0;
  padding: 0;
`
const IndecarotItem = styled.li<{ active: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  box-shadow: 0.1rem 0.1rem 0.3rem ${theme.colors.grey50};
  background: ${props => props.active ? 'white' : 'rgba(0, 0, 0, 0.08)'};
`