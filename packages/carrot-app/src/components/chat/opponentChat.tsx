
import styled from "styled-components"
import theme from "@carrot/core/style/theme"
import { useEffect } from "react"

interface OpponentChatProps {
  message: string
  createdAt: string
  hideTime: boolean
  scroll?: () => void
}

const OpponentChat = (props: OpponentChatProps) => {
  const time = props.createdAt!.split('.');
  useEffect(() => {
    props.scroll && props.scroll()
  })

  return (
    <Wrapper hideTime={props.hideTime}>
      <Message>
        <p>{props.message}</p>
      </Message>
      {!props.hideTime && 
        <CreatedAt>
          {time[time.length-1].slice(0,-3)}
        </CreatedAt>
      }
    </Wrapper>
  )
}

export default OpponentChat

const Wrapper = styled.div<{ hideTime: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.6rem;
  padding-bottom: ${props => props.hideTime ? '0.2rem' : '0.8rem'}; 
`
const CreatedAt = styled.span`
  color: ${theme.colors.grey40};
  ${theme.typography.caption2};
`
const Message = styled.div`
  max-width: 60%;
  padding: 0.8rem 1.2rem;
  border-radius: 1.6rem;
  background: ${theme.colors.grey30};
  ${theme.typography.body3};

  p {
    width: 100%;
    word-wrap: break-word;
    white-space: pre-line;
  }
`