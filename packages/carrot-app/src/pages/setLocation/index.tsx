import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

import useSetLocationViewModel from "./setLocation.viewModel";
import HeaderTemplate from "../../templates/headerTemplate";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg'
import { useCustomContext } from "../../contexts/etc/customProvider";

import theme from "@carrot/core/style/theme";
import { convertAreaToLevel } from "../../infra/location/convertArea";


const SetLocationPage = () => {
  const { area, setArea } = useCustomContext();
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
   
    }, [area, setArea])


  const leftContent = 
    <>
      <img src={backIcon} alt='backIcon' />
      <span>내 동네 설정</span>
    </>
  
  return (
    <HeaderTemplate
      leftContent={leftContent}
      onClickLeft={() => navigate(-1)}
    >
      <Map id="map"></Map>
    <button onClick={() => setArea('narrowest')}>가까운 동네</button>
    <button onClick={() => setArea('narrower')}>조금 가까운 동네</button>
    <button onClick={() => setArea('wider')}>조금 먼 동네</button>
    <button onClick={() => setArea('widest')}>먼 동네</button>
    </HeaderTemplate>
    
  )
}

export default SetLocationPage

const Map = styled.div`
  width: 100%;
  height: 45rem;
`