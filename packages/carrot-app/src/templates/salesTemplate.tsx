import { PropsWithChildren, ReactNode } from 'react'
import styled, { css } from 'styled-components';
import theme from '@carrot/core/style/theme';

type PageType = 'HOME' | 'AROUND'

interface SalesTemplateProps extends PropsWithChildren {
  pageType: PageType;
  className?: string;
  title?: string;
  leftContent?: ReactNode;
  onClickLeft?: () => void;
  rightContent?: ReactNode;
  onClickRight?: () => void;
  disableUnderline?: boolean;
}

const SalesTemplate = (props: SalesTemplateProps) => {
  return (
    <>
    <HeaderWrapper className={props.className}>
      <Title disableUnderline={props.disableUnderline}>
        <LeftContent onClick={props.onClickLeft}>
          {props.leftContent}
        </LeftContent>
        <RightContent onClick={props.onClickRight}>
          {props.rightContent}
        </RightContent>
      </Title>
      <Content>{props.children}</Content>
    </HeaderWrapper>
    {props.children}
    <BottomWrapper>
      hi
    </BottomWrapper>
    </>
  )
}

export default SalesTemplate;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`
const Title = styled.div<{ disableUnderline?: boolean }>`
  height: 6rem;
  width: 100%;
  background: linear-gradient(to bottom, #999 1%, transparent);
  position: absolute;
  top: 0;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) => 
    props.disableUnderline === true &&
    css`
      border-bottom: none;
    `}
  
  img {
    width: 4rem;
    height: 4rem;
    margin: 0.3rem;
    padding: 0.8rem;
  }
  
  img:hover {
    background: ${theme.colors.grey30};
    border-radius: 18px;
  }
`
const LeftContent = styled.div`
  display: flex;
  ${theme.typography.body1};
  font-weight: bold;
`
const Content = styled.div`
    overflow: scroll;
    width: 100%;
    height: calc(100% - 6rem);
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
  padding: 1.6rem;
  border-top: 1px solid ${theme.colors.grey30};
  display: flex;
  justify-content: space-between;
`