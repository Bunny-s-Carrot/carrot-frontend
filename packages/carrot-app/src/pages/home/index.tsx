import NavBar from "../../components/navBar";
import useJwtDecode from "../../infra/auth/useJwtDecode";
import useRefreshToken from '../../infra/auth/useRefreshToken'; 

const Home = () => {
  const refresh = useRefreshToken();
  const { getId, getName, getEmail, getToken } = useJwtDecode();


  return (
    <>
      <div>수정한 코드입니다아아아ㅏE</div>
      <button onClick={() => refresh()}>Refresh</button>
      <div>{getId()}</div>
      <div>{getEmail()}</div>
      <div>{getName()}</div>
      <div>{getToken()}</div>
      <NavBar pageType='HOME' />
    </>
  )
};

export default Home;