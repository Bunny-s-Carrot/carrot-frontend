import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomContext } from "../../../contexts/etc/customProvider";
import { getActiveLocation } from "../../../infra/location/activeLocation";
import { useMutation } from "@tanstack/react-query";
import productApi from "../../../api/product";
import useJwtDecode from "../../../hooks/auth/useJwtDecode";


const useSellProductViewModel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  const [title, setTitle] = useState(data ? data.title : '');
  const [price, setPrice] = useState(data ? data.price : '');
  const [contents, setContents] = useState(data ? data.contents : '');
  const [priceSuggest, setPriceSuggest] = useState(data ? data.priceSuggest : true);
  const [share, setShare] = useState(data ? data.share : false);
  const [classifId, setClassifId] = useState<number | null>(data ? data.classifId : 0);

  const { userLatLng } = useCustomContext();
  const { getId, getLocation } = useJwtDecode();

  const seller_id = useMemo(() => getId(), [getId]);
  const seller_location = useMemo(() => getLocation(), [getLocation]);
  const activeLocation = useMemo(() => getActiveLocation(), [getActiveLocation])

  const createPost = useMutation(productApi.createProduct);

  const handleClickSubmit = () => {
    (title !== '' && classifId !== 0 && contents !== '')  &&
    createPost.mutate({
      seller_id,
      seller_location,
      title,
      price: price === '' ? 0 : Number(price),
      contents,
      wanted_location: JSON.stringify(userLatLng),
      price_suggest: priceSuggest,
      share,
      classif_id: 1001
    },
    {
      onSuccess: () => navigate('/home')
    })
  }

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
    activeLocation,
    handleClickSubmit,
  }
}

export default useSellProductViewModel;