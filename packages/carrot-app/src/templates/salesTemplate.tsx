import { PropsWithChildren, ReactNode } from 'react'
import styled from 'styled-components';
import theme from '@carrot/core/style/theme';
import heartIconOutline from '@carrot/core/assets/icon/heart-outline.svg'

type PageType = 'HOME' | 'AROUND'

interface SalesTemplateProps extends PropsWithChildren {
  pageType: PageType;
  className?: string;
  title?: string;
  leftContent?: ReactNode;
  onClickLeft?: () => void;
  rightContent?: ReactNode;
  onClickRight?: () => void;
  bottomLeftContent?: ReactNode;
  bottomRightContent?: ReactNode;
}

const SalesTemplate = (props: SalesTemplateProps) => {
  return (
    <Container className={props.className}>
      <HeaderWrapper>
        <Title>
          <LeftContent onClick={props.onClickLeft}>
            {props.leftContent}
          </LeftContent>
          <RightContent onClick={props.onClickRight}>
            {props.rightContent}
          </RightContent>
        </Title>
      </HeaderWrapper>
      <MainContent>{props.children}</MainContent>
      <BottomWrapper>
        <BottomLeftContent>
          <HeartWrapper>
            <img src={heartIconOutline} alt='heartIcon' />
          </HeartWrapper>
          {props.bottomLeftContent}
        </BottomLeftContent>
        <BottomRightContent>
          {props.bottomRightContent}
        </BottomRightContent>
      </BottomWrapper>
    </Container>
  )
}

export default SalesTemplate;

const Container = styled.div`
  width: 100%;
  height: 100%;  
`
const HeaderWrapper = styled.div``
const Title = styled.div`
  height: 6rem;
  width: 100%;
  background: linear-gradient(to bottom, #999 1%, transparent);
  position: absolute;
  top: 0;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  img {
    max-height: 2.6rem;
  }

  img:hover {
    background: ${theme.colors.grey30};
    border-radius: 18px;
  }
`
const LeftContent = styled.div`
  display: flex;
  gap: 2rem;
  ${theme.typography.body1};
  font-weight: bold;
`
const MainContent = styled.div`
  overflow: scroll;
  width: 100%;
  height: calc(100% - 7.2rem);
  ${theme.option.hiddenScroll};
`
const RightContent = styled.div`
`
const BottomWrapper = styled.div`
  width: 100%;
  height: 7.2rem;
  background: white;
  position: absolute;
  bottom: 0;
  padding: 1.2rem 1.6rem;
  border-top: 1px solid ${theme.colors.grey30};
  display: flex;
  justify-content: space-between;

  div{
    position: relative;

    img {
      position: absolute;
      top: 0.6rem;
      width: 90%;
      height: 90%;
    }
  }
  
`
const BottomLeftContent = styled.div`
  width: 100%;
  display: flex;  
`
const HeartWrapper = styled.div`
  position: relative;
  width: 3.2rem;
  height: 3.2rem;
  margin-right: 3.2rem;

  ::after {
    content: '';
    position: absolute;
    top: 0.2rem;
    right: -1.4rem;
    width: 0.1rem;
    height: 4rem;
    background-color: ${theme.colors.grey40};
  }
`
const BottomRightContent = styled.div`
  display: flex;
`