import styled from "styled-components";
import gpsOnIcon from '@carrot/core/assets/icon/gps-on.svg';
import useGeolocation from "../../hooks/location/useGeolocation";

interface GPSOnProps {
  map: any
}

const GPSOn = (props: GPSOnProps) => {

  const geolocation = useGeolocation();

  const panTo = (lat: number, lng: number) => {
    const moveLatLng = new window.naver.maps.LatLng(lat, lng);

    props.map.panTo(moveLatLng)
  }

  const moveToCurrent = () => {
    geolocation(panTo)
  }

  return (
    <Wrapper onClick={moveToCurrent}>
      <img src={gpsOnIcon} alt='gpsOnIcon' />
    </Wrapper>
  )
  
}

export default GPSOn;

const Wrapper = styled.div`
  width: 5rem;
  height: 5rem;
  background: white;
  border-radius: 50%;
  position: absolute;
  z-index: 5;
  bottom: 10%;
  right: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.5);

  img {
    width: 2.5rem;
    height: 2.5rem; 
  }
`