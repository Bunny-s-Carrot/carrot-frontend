import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from '@carrot/core/atoms/button';

import HeaderTemplate from "../../../../templates/headerTemplate"
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import gpsOnIcon from '@carrot/core/assets/icon/gps-on.svg'
import locationMarker from '@carrot/core/assets/icon/location-marker.svg'
import theme from "@carrot/core/style/theme";

import useSetWantedLocationViewModel from './setWantedLocation.viewModel';

const SetWantedLocation = () => {

  const navigate = useNavigate();
  const setWantedLocationViewModel = useSetWantedLocationViewModel();
  
  return (
    <HeaderTemplate
      leftContent={<img src={backIcon} alt='backIcon' />}
      onClickLeft={() => navigate(-1)}
      noBorderBottom
    >
      <InstructionWrapper>
        <p>
          이웃과 만나서 <br />
          거래하고 싶은 장소를 선택해주세요.
        </p>
        <span>만나서 거래할 때는 누구나 찾기 쉬운 공공장소가 좋아요.</span>
      </InstructionWrapper>
      <Map id="map">
        <img src={locationMarker} alt='locationMarker' />
      </Map>
      <ButtonWrapper>
        <StyledButton
          buttonType='CARROT'
          onClick={setWantedLocationViewModel.getCenter}
        >
          선택 완료
        </StyledButton>
      </ButtonWrapper>
      <GPSOn onClick={setWantedLocationViewModel.moveToCurrent}>
        <img src={gpsOnIcon} alt='gpsOnIcon' />
      </GPSOn>
    </HeaderTemplate>
    
  )
}

export default SetWantedLocation;

const InstructionWrapper = styled.div`
  width: 100%;
  padding: 1.6rem;
  background: white;

  p {
    ${theme.typography.body2};
    font-weight: bold;
    margin-bottom: 0.8rem;
  }

  span {
    ${theme.typography.body4};
    
  }
`
const Map = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 5rem;
    height: 5rem;
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
`
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 1.6rem;
  width: 100%;
  padding: 0 1.6rem;
  background: transparent;
  z-index: 5;
`
const StyledButton = styled(Button)`
  width: 100%;
`
const GPSOn = styled.div`
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