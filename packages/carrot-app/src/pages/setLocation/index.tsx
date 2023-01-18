import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components"

import useMap from "../../hooks/map/useMap";
import useSetLocationViewModel from "./setLocation.viewModel";
import { useCustomContext } from "../../contexts/etc/customProvider";
import { convertAreaToLevel } from "../../infra/location/convertArea";

import HeaderTemplate from "../../templates/headerTemplate";
import Slider from "../../components/slider";
import theme from "@carrot/core/style/theme";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import closeIconWhite from '@carrot/core/assets/icon/close-white.svg';
import addIcon from '@carrot/core/assets/icon/add.svg';

const SetLocationPage = () => {
  const { area } = useCustomContext();
  const navigate = useNavigate();
  
  const setLocationViewModel = useSetLocationViewModel();
  const locationInfo = setLocationViewModel.locationData?.location_info;
  const locationInfo2 = setLocationViewModel.locationData?.location_info2;

  const leftContent = 
    <>
      <img src={backIcon} alt='backIcon' />
      <span>내 동네 설정</span>
    </>
  
  return (
    <HeaderTemplate
      leftContent={leftContent}
      onClickLeft={() => {
        const from = localStorage.getItem('from') ?? '/around';
        navigate(from)}}
    >
      <Map id="map"></Map>

      {setLocationViewModel.isSuccess && <LocationSetWrapper>
        <Title>내 동네</Title>
        <MyLocations>
          <LocationBoxLeft 
            active={setLocationViewModel.locationData?.active_location === 0}
            onClick={(e) => {
              e.stopPropagation()
              setLocationViewModel.handleClickBoxLeft()}
            }
          >
            <span>{locationInfo.lowest_sect_name}</span>
            <div>
              <img
                src={closeIconWhite}
                alt='closeIcoonWhite'
                onClick={(e) => {
                  e.stopPropagation()
                  setLocationViewModel.handleClickDeleteLocation(true)}
                }
              />
            </div>
            
          </LocationBoxLeft>
          <LocationBoxRight
            onClick={setLocationViewModel.handleClickBoxRight}
            isMyLocation2={locationInfo2} 
            active={setLocationViewModel.locationData?.active_location === 1}
          >
            {!locationInfo2
            ? <div onClick={(e) => {
              e.stopPropagation()
              setLocationViewModel.handleClickAddLocation()}
            }>
                <img
                   
                  src={addIcon}
                  alt='addIcon' 
                />
              </div>
            : <>
                <span>{locationInfo2.lowest_sect_name}</span>
                <div onClick={(e) => {
                  e.stopPropagation()
                  setLocationViewModel.handleClickDeleteLocation(false)}
                }>
                  <img
                    src={closeIconWhite}
                    alt='closeIcoonWhite'  
                  />
                </div>
              </>}
          </LocationBoxRight>
        </MyLocations>
        <NeighborhoodLocation>
            {setLocationViewModel.locationData?.active_location === 0 
              ? locationInfo.lowest_sect_name
              : locationInfo2?.lowest_sect_name}과 근처 동네
          </NeighborhoodLocation>
        <Slider />
        <InfoWrapper>
          🥕
          <span>
            {area >= 0 && area < 0.5
            ? '가까운 동네'
            : area >= 0.5 && area < 1.5
            ? '조금 가까운 동네'
            : area >= 1.5 && area < 2.5
            ? '조금 먼 동네'
            : '먼 동네'}
          </span> 게시글을 볼 수 있어요.
        </InfoWrapper>
      </LocationSetWrapper>}
    </HeaderTemplate>
  )
}

export default SetLocationPage

const Map = styled.div`
  width: 100%;
  height: 45rem;
`

const LocationSetWrapper = styled.div`
  width: 100%;
  height: calc(100% - 42rem);
  position: absolute;
  bottom: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  background: white;
  padding: 2rem 1.6rem;
  border-radius: 0.8rem 0.8rem 0 0;
`
const Title = styled.p`
  ${theme.typography.body2};
  font-weight: bold;
`
const MyLocations = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const LocationBoxLeft = styled.div<{ active: boolean }>`
  width: 49%;
  height: 4.2rem;
  border-radius: 0.4rem;
  padding: 0 0 0 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.typography.body4};
  font-weight: bold;
  color: white;
  background: ${props => props.active ? `${theme.colors.carrot}` : `${theme.colors.grey30}`};

  div {
    padding: 1rem 1.6rem;

    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  
`
const LocationBoxRight = styled(LocationBoxLeft)<{ isMyLocation2: boolean }>`
  ${props => props.isMyLocation2
    ? css`
    `
    : css`
        background: ${theme.colors.grey30};

        div {
          margin: 0 auto;
          padding: 1rem 3.2rem 1rem 1.6rem;
        }
    `}
  
`
const NeighborhoodLocation = styled.p`
  ${theme.typography.body3};
  font-weight: bold;
  text-decoration: underline;
`
const InfoWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 0.4rem 0.6rem;
  background: ${theme.colors.grey30};
  ${theme.typography.body4};
  border-radius: 0.4rem;

  span {
    font-weight: bold;
  }
`