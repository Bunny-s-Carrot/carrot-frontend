import { PropsWithChildren, ReactNode } from 'react'
import styled from 'styled-components';
import theme from '@carrot/core/style/theme';

interface HeaderTemplateProps extends PropsWithChildren {
  className?: string;
  title?: string;
  leftContent?: ReactNode;
  onClickLeft?: () => void;
  rightContent?: ReactNode;
  onClickRight?: () => void;
}

const HeaderTemplate = (props: HeaderTemplateProps) => {
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
      <Content>{props.children}</Content>
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

  .down {
    width: 2.7rem;
    height: 2.7rem;
    transform: rotate(-90deg);
    margin: 0.4rem 0;
  }

  .down:hover {
    background: none;
    cursor: pointer;
  }

`
const Content = styled.div`
  overflow: scroll;
  width: 100%;
  height: calc(100% - 6rem);
  ${theme.option.hiddenScroll};
`
const RightContent = styled.div`
`