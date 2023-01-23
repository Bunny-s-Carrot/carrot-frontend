import FloatingButton from "../../components/floatingButton";
import NavBar from "../../components/navBar"

const AroundPage = () => {
  const handleClickTest = () => {
    const Message = () => {
      postMessage("HIHIHIHIHI");
    }

  window.OpenMap = Message;
  window.OpenMap.postMessage("HHAAAAAAAAAHHHHHHHHHHHHHAAAAAAAAHHHHH");
  }
  
  return (
    <div>
      <button onClick={() => {
        window.OpenMap.postMessage("HALFG:ADLKGJA:DLKGJA:LDFJA:LKSF")
        handleClickTest()}
      }>test</button>
      <FloatingButton pageType="AROUND" />
      <NavBar pageType='AROUND' />
    </div>
  )
};

export default AroundPage;