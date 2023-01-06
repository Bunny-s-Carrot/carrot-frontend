import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from '@carrot/core/atoms/input/searchInput';
import Button from '@carrot/core/atoms/button';
import theme from "@carrot/core/style/theme";
import searchGreyIcon from '@carrot/core/assets/icon/search_grey.svg'
import useFindLocationViewModel from "./findLocation.viewModel";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocationList } from "../../api/location";

const FindLocationPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const { data } = useQuery(['location'], getLocationList);
  const findLocationViewModel = useFindLocationViewModel();

  const searchLocation = () => {
    if (data === undefined) return []
    return data.filter(
      (value) => 
        value.name.includes(inputValue)
    );
  }

  useEffect(() => {
   console.log(findLocationViewModel.localData)
  },[findLocationViewModel.localData])

  return (
    <Container>
      <SearchWrapper>
        <SearchInput
          placeholder="내 동네 이름(동, 읍, 면)으로 검색"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <SearchButton
          buttonType="CARROT"
          onClick={findLocationViewModel.getLocation}
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
  display: flex;

  input {
    background-image: url(${searchGreyIcon});
    background-repeat: no-repeat;
    background-size: 1.6rem;
    background-position-y: center;
    padding-left: 2.4rem;
    border-bottom: 1px solid ${theme.colors.grey40};
    line-height: 3rem;
    
  }`
const SearchButton = styled(Button)`
  width: 100%;
  height: 3.2rem;
  border-radius: 0.4rem;
  ${theme.typography.body4};  
`