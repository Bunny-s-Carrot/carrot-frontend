import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"

const AroundPage = () => {
  const handleClickTest = () => {
    postMessage("HIHIHIHIHI");
  }
  
  return (
    <div>
      <button onClick={handleClickTest}>
        test
      </button>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType='AROUND' />
    </div>
  )
};

export default AroundPage;