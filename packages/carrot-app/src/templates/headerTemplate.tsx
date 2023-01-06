import { PropsWithChildren, ReactNode } from 'react'
import styled, { css } from 'styled-components';
import theme from '@carrot/core/style/theme';

interface HeaderTemplateProps extends PropsWithChildren {
  className?: string;
  title?: string;
  leftContent?: ReactNode;
  onClickLeft?: () => void;
  rightContent?: ReactNode;
  onClickRight?: () => void;
  disableUnderline?: boolean;
}

const HeaderTemplate = (props: HeaderTemplateProps) => {
  return (
    <Wrapper className={props.className}>
      <Title disableUnderline={props.disableUnderline}>
        <LeftContent onClick={props.onClickLeft}>
          {[props.leftContent]}
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
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`
const Title = styled.div<{ disableUnderline?: boolean }>`
  height: 6rem;
  width: 100%;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
  ${(props) => 
    props.disableUnderline === true &&
    css`
      border-bottom: none;
    `}
`
const LeftContent = styled.div`
  display: flex;
`

const Content = styled.div`
    overflow: scroll;
    width: 100%;
    height: calc(100% - 6rem);
    ${theme.option.hiddenScroll};
`
const RightContent = styled.div`
`