import styled from "styled-components"

export interface SwiperItemProps {
  imgSrc: string
}

const SwiperItem = (props: SwiperItemProps) => {

  return (
    <SwiperList>
      <img src={props.imgSrc} alt='swipeItem' draggable='false' />
    </SwiperList>
  )
}

export default SwiperItem;

const SwiperList = styled.li`
  width: 100%;
  flex-shrink: 0;
  object-fit: cover;

  img {
    width: 100%;
    height: 100%;
  }
`
