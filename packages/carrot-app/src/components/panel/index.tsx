import { PropsWithChildren } from 'react'
import styled from "styled-components";

import backIcon from '@carrot/core/assets/icon/back_arrow.svg'
import theme from '@carrot/core/style/theme';

type PanelType = 'REPORT' | 'WANTED_LOCATION' | 'SELLING' | 'CUSTOM';

interface PanelProps extends PropsWithChildren {
  type: PanelType;
  sellerName?: string;
}

const Panel = (props: PanelProps)  => {
  if (props.type === 'REPORT') {
    return (
      <Wrapper>
        <Title>
          <span>이 게시글 신고하기</span>
          <img src={backIcon} alt='arrow' />
      </Title>
    </Wrapper>
  )}

  else if (props.type === 'WANTED_LOCATION') {
    return (
      <Wrapper>
        <Title>
          <span>거래 희망 장소</span>
          <img src={backIcon} alt='arrow' />
      </Title>
    </Wrapper>
  )}

  else if (props.type === 'SELLING') {
    return (
      <Wrapper>
        <Title>
          <span>{props.sellerName}님의 판매상품</span>
          <img src={backIcon} alt='arrow' />
      </Title>
    </Wrapper>
  )}

  else return null;
}

export default Panel;

const Wrapper = styled.div`
  padding: 1.6rem;
  width: 100%;
  height: 6.8rem;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
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