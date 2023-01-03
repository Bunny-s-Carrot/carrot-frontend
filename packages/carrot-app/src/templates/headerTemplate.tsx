import { PropsWithChildren, ReactNode } from 'react'
import styled, { css } from 'styled-components';
import theme from '@carrot/core/style/theme';
import backIcon from '@carrot/core/assets/icon/back_arrow.svg';

interface HeaderTemplateProps extends PropsWithChildren {
  title?: string;
  onClickBack?: () => void;
  rightContent?: ReactNode;
  onClickRight?: () => void;
  disableUnderline?: boolean;
}

const HeaderTemplate = (props: HeaderTemplateProps) => {
  return (
    <Wrapper>
      <Title disableUnderline={props.disableUnderline}>
        <TitleTextButtonWrapper>
          <BackButton src={backIcon} onClick={props.onClickBack} />
          <TitleText>{props.title}</TitleText>
        </TitleTextButtonWrapper>
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
  display: flex;
  align-items: center;
  justiry-content: space-between;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
  ${(props) => 
    props.disableUnderline === true &&
    css`
      border-bottom: none;
    `}
`
const TitleTextButtonWrapper = styled.div`
  display: flex;
`
const TitleText = styled.p`
  margin: auto 0;
  ${theme.typography.heading4};
`
const BackButton = styled.img`
    margin: auto 1.6rem;
`
const Content = styled.div`
    overflow: scroll;
    width: 100%;
    height: calc(100% - 6rem);
    ${theme.option.hiddenScroll};
`
const RightContent = styled.div`
  margin: auto 3.2rem;
`