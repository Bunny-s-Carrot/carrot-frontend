const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLng = position.coords.longitude;
        const userLat = position.coords.longitude;

        return [userLng, userLat];
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity
      }
    );
  } else {
    alert("웹 브라우저가 Geolocation을 지원하지 않습니다.");
    return null;
  }
}

export { getLocation }