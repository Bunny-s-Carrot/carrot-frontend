import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderTemplate from "../../templates/headerTemplate";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import useMap from "../../hooks/map/useMap";
import GPSOn from "../../components/map/GPSOn";



const WantedLocationPage = () => {
  const [maps, setMaps] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const { map, drawMap } = useMap();
  const lat = location.state?.lat;
  const lng = location.state?.lng;

  useEffect(() => {
    drawMap(lat, lng, 13);

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: map.current
    })
    setMaps(map.current);
  }, [drawMap, lat, lng, map])

  const leftContent = 
  <>
    <img src={backIcon} alt='backIcon' />
    <span>거래 희망 장소</span>
  </>

  return (
    <HeaderTemplate
      leftContent={leftContent}
      onClickLeft={() => navigate(-1)}
    >
      <Map id='map' />
      <GPSOn map={maps} />
    </HeaderTemplate>
  )
}

export default WantedLocationPage;

const Map = styled.div`
  width: 100%;
  height: 100%;
`