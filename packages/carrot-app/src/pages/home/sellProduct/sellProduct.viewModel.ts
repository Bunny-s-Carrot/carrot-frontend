import { useState } from "react";
import { useCustomContext } from "../../../contexts/etc/customProvider";

const useSellProductViewModel = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [contents, setContents] = useState('');

  const [priceSuggest, setPriceSuggest] = useState(false);
  const [share, setShare] = useState(false);
  const [classifId, setClassifId] = useState(0);

  const { userLatLng } = useCustomContext();
  console.log(userLatLng);

  return {
    title,
    setTitle,
    price,
    setPrice,
    contents,
    setContents,

    priceSuggest,
    setPriceSuggest,
    share,
    setShare,
    classifId,
    setClassifId,
  }
}

export default useSellProductViewModel;