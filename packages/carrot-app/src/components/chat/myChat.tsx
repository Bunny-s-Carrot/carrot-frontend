
import styled from "styled-components"
import moment from "moment"
import theme from "@carrot/core/style/theme"


interface MyChatProps {
  message?: string
  createdAt?: string
}

const MyChat = (props: MyChatProps) => {
  const time = props.createdAt!.split('.');

  return (
    <Wrapper>
      <CreatedAt>
        {time[time.length-1].slice(0,-3)}
      </CreatedAt>
      <Message>
        {props.message || '하이하이하이하이하이하이하이하이하이하이'}
      </Message>
    </Wrapper>
  )
}

export default MyChat

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.6rem;
  padding: 0.6rem 0;
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
`