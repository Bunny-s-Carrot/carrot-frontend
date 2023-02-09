
import styled from "styled-components"
import moment from "moment"
import theme from "@carrot/core/style/theme"

interface SellerChatProps {
  message?: string
  createdAt?: string
}

const SellerChat = (props: SellerChatProps) => {
  return (
    <Wrapper>
      <Message>
        {props.message || '안녕하세요'}
      </Message>
      <CreatedAt>
      {moment(props.createdAt).locale('ko').format('a h:mm') || '오후 7:10'}
      </CreatedAt>
    </Wrapper>
  )
}

export default SellerChat

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
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
  background: ${theme.colors.grey30};
  ${theme.typography.body3};
`