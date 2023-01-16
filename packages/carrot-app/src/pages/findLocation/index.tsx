import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from '@carrot/core/atoms/input/searchInput';
import Button from '@carrot/core/atoms/button';
import theme from "@carrot/core/style/theme";
import searchGreyIcon from '@carrot/core/assets/icon/search_grey.svg'
import useFindLocationViewModel from "./findLocation.viewModel";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import locationApi from "../../api/location";
import { LocationDataType } from "../../api/location/locationDto";
import { useCustomContext } from "../../contexts/etc/customProvider";
import { setLocation, setLocation2 } from "../../infra/location/locationData";


const FindLocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const { setActiveLocation } = useCustomContext();
  const { data, isSuccess } = useQuery(['location'], locationApi.getLocationList);
  const findLocationViewModel = useFindLocationViewModel();

  const from = location.state.from;
  const searchLocation = (): LocationDataType[] => {
    if (data === undefined) return []

    return data.payload.filter(
      (value) => 
          value.full_name?.includes(inputValue)
    );
  }

  return (
    <Container>
      <SearchWrapper>
        <SearchInput
          placeholder="내 동네 이름(동, 읍, 면)으로 검색"
          onChange={(e) => {
            setInputValue(e.target.value);
            searchLocation();
          }
            }
          value={inputValue}
        />
        <SearchButton
          buttonType="CARROT"
          onClick={findLocationViewModel.getLocation}
        >
          현재 위치로 찾기
        </SearchButton>
      </SearchWrapper>
      <ResultWrapper>
        {isSuccess && 
        (searchLocation().length === 0 || inputValue.length === 0
        ? <NoResult>
            <p>
              검색 결과가 없어요. <br />
              동네 이름을 확인해주세요!
            </p>
            <span>내 동네 이름 검색하기</span>
          </NoResult>
        : <Result>
            <p>'{inputValue}' 검색결과</p>
            <ul>
              {searchLocation().map((item: LocationDataType, index: number) => (
              <li
                key={index}
                onClick={() => {
                  if (from === 'setlocation') {
                    setLocation2(item.location_id.toString(), item.lowest_sect_name, item.h_code.toString(), item.x_coord.toString(), item.y_coord.toString())
                    setActiveLocation(1);
                    navigate('/setlocation', 
                    { state: { id: item.location_id, name: item.lowest_sect_name } })
                  } else {
                    setLocation(item.location_id.toString(), item.lowest_sect_name, item.h_code.toString(), item.x_coord.toString(), item.y_coord.toString())
                    navigate('/auth/signup', 
                    { state: { id: item.location_id, name: item.full_name } })
                  }
                }}
              >
                <span>{item.full_name}</span>
              </li>
              ))}
            </ul>
          </Result>
        )}
      </ResultWrapper>
    </Container>
  )
}

export default FindLocationPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.6rem;
  background: white;
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
const ResultWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 1.6rem;
  ${theme.option.hiddenScroll};
`
const NoResult = styled.div`
  margin-top: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${theme.typography.body3};

  p {
    line-height: 2.4rem;
    color: ${theme.colors.grey50};
  }

  span {
    line-height: 4.8rem;
    color: ${theme.colors.carrot};
    font-weight: bold;
  }
`
const Result = styled.div`
  p {
    margin: 2.8rem 0;
    ${theme.typography.body4};
    font-weight: bold;
  }

  ul {
    height: 100%;
    ${theme.typography.body3};
    margin-bottom: 2rem;

    li {
      height: 4.8rem;
      border-bottom: 1px solid ${theme.colors.grey30};
      display: flex;
      align-items: center;
    }
  }
`