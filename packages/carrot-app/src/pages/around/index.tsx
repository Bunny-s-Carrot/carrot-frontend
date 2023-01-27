import { useEffect } from "react";
import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"
import styled from "styled-components";

const array = [
  [127.11224555969238, 37.37544345085402],
  [127.10791110992432, 37.37230584065902],
  [127.10795402526855, 37.35975408751081],
  [127.11576461791992, 37.359924641705476],
  [127.12211608886719, 37.35931064479073],
  [127.12293148040771, 37.36043630196386], 
  [127.12310314178465, 37.36354029942161], 
  [127.12456226348876, 37.365211629488016], 
  [127.11224555969238, 37.37544345085402]
]


const AroundPage = () => {
  const { naver } = window

  

  useEffect(() => {
  const map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3674001, 127.1181196),
    zoom: 14
  });
  

  for (let i = 0; i < 2; i++) {
    console.log(i)};
  
  
  }, [])
  
  return (
    <Wrapper>
      <div id='map' style={{ width: '100%', height: '50rem' }}></div>
      <NavBar pageType="AROUND" />
    </Wrapper>
    
  )
};

export default AroundPage;

const Wrapper = styled.div`

`