const watchCoords = (position) => {
  const userLng = position.coords.longitude;
  const userLat = position.coords.latitude;

  return [userLng, userLat];
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(watchCoords);
  } else {
    alert("웹 브라우저가 Geolocation을 지원하지 않습니다.")
  }
}

export { watchCoords, getLocation }