import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"

const AroundPage = () => {

  
  return (
    <div>
      <button onClick={() => {
        window.OpenMap?.postMessage("WPQKFPWLWKDLWP");
      }}>
        test
      </button>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType='AROUND' />
    </div>
  )
};

export default AroundPage;