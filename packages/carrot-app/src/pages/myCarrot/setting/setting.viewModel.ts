import { useState } from "react";

const useSettingViewModel = () => {

  const [isOpenModal, openModal] = useState(false);

  return {
    isOpenModal,
    openModal,

  }
}

export default useSettingViewModel