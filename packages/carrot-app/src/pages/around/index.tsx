import { useEffect } from "react";
import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"

const AroundPage = () => {

  useEffect(() => {
    window.addEventListener("flutterInAppWebViewPlatformReady", () => {
      window.flutter_inappwebview._callHandler('OpenMap', "문열어")
        .then((res: any) => alert(res))
    })
  }, [])
  
  return (
    <div>
      <button onClick={() => {
        window.flutter_inappwebview?._callHandler('OpenMap', '맵 열어!');
      }}>
        test
      </button>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType='AROUND' />
    </div>
  )
};

export default AroundPage;