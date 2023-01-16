import { PropsWithChildren, ReactNode, useRef } from 'react'
import styled from 'styled-components';
import theme from '@carrot/core/style/theme';
import { useCustomContext } from '../contexts/etc/customProvider';

interface HeaderTemplateProps extends PropsWithChildren {
  className?: string;
  title?: string;
  leftContent?: ReactNode;
  onClickLeft?: () => void;
  rightContent?: ReactNode;
  onClickRight?: () => void;
}

const HeaderTemplate = (props: HeaderTemplateProps) => {
  const { setScrollTop } = useCustomContext();
  const contentRef = useRef<any>();

  const handleScroll = () => {
    setScrollTop(contentRef.current.scrollTop);
  }
  
  return (
    <Wrapper className={props.className}>
      <Title>
        <LeftContent onClick={props.onClickLeft}>
          {props.leftContent}
        </LeftContent>
        <RightContent onClick={props.onClickRight}>
          {props.rightContent}
        </RightContent>
      </Title>
      <Content ref={contentRef} onScroll={handleScroll}>{props.children}</Content>
    </Wrapper>
  )
}

export default HeaderTemplate;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
`
const Title = styled.div`
  height: 6rem;
  width: 100%;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
`

const LeftContent = styled.div`
  display: flex;
  ${theme.typography.body2};
  font-weight: bold;
  gap: 2rem;

  .down {
    width: 2.7rem;
    height: 2.7rem;
    padding: 0.8rem;
    transform: rotate(-90deg);
    margin: 0.4rem 0;
  }

  .down:hover {
    background: none;
    cursor: pointer;
  }

`
const Content = styled.div`
  position: relative;
  overflow: scroll;
  width: 100%;
  height: calc(100% - 6rem);
  ${theme.option.hiddenScroll};
`
const RightContent = styled.div`
  display: flex;
  gap: 0.8rem;

  img {
    width: 3.8rem;
    height: 3.8rem;
    padding: 0.8rem;
  }
  ${theme.typography.body2};
`