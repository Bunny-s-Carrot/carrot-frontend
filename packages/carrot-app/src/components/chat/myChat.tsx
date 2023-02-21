
import styled from "styled-components"
import theme from "@carrot/core/style/theme"


interface MyChatProps {
  message: string
  createdAt: string
  hideTime: boolean
}

const MyChat = (props: MyChatProps) => {
  const time = props.createdAt!.split('.');

  return (
    <Wrapper hideTime={props.hideTime}>
      {!props.hideTime && 
        <CreatedAt>
          {time[time.length-1].slice(0,-3)}
        </CreatedAt>
      }
      <Message>
        <p>{props.message}</p>
      </Message>
    </Wrapper>
  )
}

export default MyChat

const Wrapper = styled.div<{ hideTime: boolean }>`
  display: flex;
  justify-content: flex-end;
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
  background: ${theme.colors.carrot};
  color: white;
  ${theme.typography.body3};

  p {
    width: 100%;
    word-wrap: break-word;
    white-space: pre-line;
  }
`