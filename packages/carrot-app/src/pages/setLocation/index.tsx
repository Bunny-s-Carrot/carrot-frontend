import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components"

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
  const { kakao } = window;
  const navigate = useNavigate();
  
  const setLocationViewModel = useSetLocationViewModel();

  useEffect(() => {
    const getArray = async () => {
      const array = await setLocationViewModel.createPolygon();
      return array;
      };
    
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(setLocationViewModel.yCoord, setLocationViewModel.xCoord), //지도의 중심좌표.
      level: convertAreaToLevel(area)
    };
     
    const map = new kakao.maps.Map(container, options);
  
    getArray().then(res => {

      for (let i = 0; i < res!.length; i++) {

        new kakao.maps.Polygon({
          map: map,
          path: res![i][0],
          strokeOpacity: 0,
          fillColor: theme.colors.carrot,
          fillOpacity: 0.4
        })
      }
    })
   
    }, [setLocationViewModel.createPolygon])


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

      <LocationSetWrapper>
        <Title>내 동네</Title>
        <MyLocations>
          <LocationBoxLeft 
            active={setLocationViewModel.activeLocation === 0}
            onClick={setLocationViewModel.handleClickBoxLeft}
          >
            <span>{setLocationViewModel.myLocationName}</span>
            <img
              src={closeIconWhite}
              alt='closeIcoonWhite'
              onClick={() => setLocationViewModel.handleClickDeleteLocation(true)}
            />
          </LocationBoxLeft>
          <LocationBoxRight
            onClick={setLocationViewModel.handleClickBoxRight}
            isMyLocation2={setLocationViewModel.myLocationName2 !== ''} 
            active={setLocationViewModel.activeLocation === 1}
          >
            {setLocationViewModel.myLocationName2 === ''
            ? <img 
                src={addIcon}
                alt='addIcon' 
              />
            : <>
                <span>{setLocationViewModel.myLocationName2}</span>
                <img
                  src={closeIconWhite}
                  alt='closeIcoonWhite'
                  onClick={() => setLocationViewModel.handleClickDeleteLocation(false)}  
                />
              </>}
          </LocationBoxRight>
        </MyLocations>
        <NeighborhoodLocation>
            {setLocationViewModel.myLocationName}과 근처 동네
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
        
      </LocationSetWrapper>
      
    </HeaderTemplate>
    
  )
}

export default SetLocationPage

const Map = styled.div`
  width: 100%;
  height: 45rem;
  background: black;
`

const LocationSetWrapper = styled.div`
  width: 100%;
  height: calc(100% - 42rem);
  position: absolute;
  bottom: 0;
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
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.typography.body4};
  font-weight: bold;
  color: white;
  background: ${props => props.active ? `${theme.colors.carrot}` : `${theme.colors.grey30}`};

  img {
    width: 1.2rem;
    height: 1.2rem;
  }
`
const LocationBoxRight = styled(LocationBoxLeft)<{ isMyLocation2: boolean }>`
  ${props => props.isMyLocation2
    ? css``
    : css`
        background: ${theme.colors.grey30};

        img {
          margin: 0 auto;
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