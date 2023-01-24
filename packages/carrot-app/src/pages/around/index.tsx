import { useEffect } from "react";
import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"

const AroundPage = () => {
  const mapEventCallback = (value: any) => {
    alert(value);
    console.log("From React ::::::", value, typeof value);
  }
  
  useEffect(() => {
    window.DoSomething2 = new EventTarget();
    window.getCoords = new CustomEvent("mapEvent")
    window.DoSomething4 = new CustomEvent(window.DoSomething2);

    window.addEventListener(window.DoSomething2, mapEventCallback)
    window.addEventListener("mapEvent", mapEventCallback);

    return () => {
      window.removeEventListener(window.DoSomething2, mapEventCallback)
      window.removeEventListener("mapEvent", mapEventCallback);
    }
  }, [])

  
  return (
    <div>
      <button onClick={() => {
        window.OpenMap?.postMessage("open map");
      }}>
        <button onClick={mapEventCallback}></button>
        test
      </button>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType='AROUND' />
    </div>
  )
};

export default AroundPage;