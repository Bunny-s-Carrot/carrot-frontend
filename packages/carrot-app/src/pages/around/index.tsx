import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"

const AroundPage = () => {
  const handleClickTest = () => {
    window.postMessage("HIHIHIHIHI");
  }
  
  return (
    <div>
      <button onClick={() => {handleClickTest(); window.postMessage("제발찐짜 돼라 제발")}}>
        test
      </button>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType='AROUND' />
    </div>
  )
};

export default AroundPage;