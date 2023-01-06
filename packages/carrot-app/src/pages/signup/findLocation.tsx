import styled from "styled-components";
import Input from '@carrot/core/atoms/input/searchInput';
import Button from '@carrot/core/atoms/button';
import theme from "@carrot/core/style/theme";

const FindLocationPage = () => {
  return (
    <Container>
      <SearchWrapper>
        <SearchInput
          placeholder="내 동네 이름(동, 읍, 면)으로 검색"
        />
        <SearchButton
          buttonType="CARROT"
          onClick={() => {}}
        >
          현재 위치로 찾기
        </SearchButton>
      </SearchWrapper>
      
    </Container>
  )
}

export default FindLocationPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.6rem;
`
const SearchWrapper = styled.div`
  height: 8.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const SearchInput = styled(Input)`
  input {
    border-bottom: 1px solid ${theme.colors.grey40};
    line-height: 3rem;
    
  }`
const SearchButton = styled(Button)`
  width: 100%;
  height: 3.2rem;
  border-radius: 0.4rem;
  ${theme.typography.body4};  
`