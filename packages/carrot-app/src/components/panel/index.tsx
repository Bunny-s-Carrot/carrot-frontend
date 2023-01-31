import { PropsWithChildren, useEffect } from 'react'
import styled from "styled-components";

import backIcon from '@carrot/core/assets/icon/back-arrow.svg'
import theme from '@carrot/core/style/theme';
import useMap from '../../hooks/map/useMap';

type PanelType = 'REPORT' | 'WANTED_LOCATION' | 'SELLING' | 'CUSTOM';

interface PanelProps extends PropsWithChildren {
  type: PanelType
  className?: string
  sellerName?: string
  onClick?: () => void
  lat?: number
  lng?: number
}

const Panel = (props: PanelProps)  => {
  const { map, drawMap } = useMap();

  useEffect(() => {
    if (props.type === 'WANTED_LOCATION') {
      drawMap(props.lat, props.lng, 15, false, false);

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(props.lat, props.lng),
        map: map.current
      });
    }
  }, [drawMap, map, props.lat, props.lng, props.type])

  if (props.type === 'REPORT') {
    return (
      <Wrapper className={props.className} onClick={props.onClick}>
        <Title>
          <span>이 게시글 신고하기</span>
          <img src={backIcon} alt='arrow' />
      </Title>
    </Wrapper>
  )}

  else if (props.type === 'WANTED_LOCATION') {
    return (
      <Wrapper className={props.className} onClick={props.onClick}>
        <Title>
          <span>거래 희망 장소</span>
          <img src={backIcon} alt='arrow' />
      </Title>
      <Map id='map' />
    </Wrapper>
  )}

  else if (props.type === 'SELLING') {
    return (
      <Wrapper className={props.className} onClick={props.onClick}>
        <Title>
          <span>{props.sellerName}님의 판매상품</span>
          <img src={backIcon} alt='arrow' />
      </Title>
    </Wrapper>
  )}

  else return (
    <Wrapper className={props.className} onClick={props.onClick}>
        <Title>
          <span>{props.children}</span>
          <img src={backIcon} alt='arrow' />
      </Title>
    </Wrapper>
  );
}

export default Panel;

const Wrapper = styled.div`
  padding: 1.6rem;
  width: 100%;
  min-height: 6.8rem;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`
const Title = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    ${theme.typography.body2};
    font-weight: bold;
  }

  img {
    width: 2rem;
    height: 2rem;
    transform: rotate(180deg);
  }
`
const Map = styled.div`
  width: 100%;
  height: 18rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${theme.colors.grey30};
`