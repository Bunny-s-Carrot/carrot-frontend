import { useState } from "react";
import useToken from "../../../hooks/auth/useToken";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const useSettingViewModel = () => {

  const [isOpenModal, openModal] = useState(false);
  const [clickOn, setClickOn] = useState('');
  const navigate = useNavigate();
  const { logout, withdraw } = useToken();
  
  const handleClickModalRight = () => {
    openModal(false);
    if (clickOn === 'logout') {
      logout().then(res => res.status === 200
        &&( toast.success('로그아웃되었습니다.'),
          navigate('/')))
    } else if (clickOn === 'withdraw') {
      withdraw().then(res => res.status === 200
        && (toast.success('정상적으로 탈퇴처리 되었습니다.'),
          navigate('/')));
    }
  }
  return {
    isOpenModal,
    openModal,
    clickOn,
    setClickOn,
    handleClickModalRight
  }
}

export default useSettingViewModel