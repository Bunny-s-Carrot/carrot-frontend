import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomContext } from "../../../contexts/etc/customProvider";
import { getActiveLocation } from "../../../infra/location/activeLocation";
import { useMutation } from "@tanstack/react-query";
import productApi from "../../../api/product";
import useJwtDecode from "../../../hooks/auth/useJwtDecode";

interface ImageType {
  data: File,
  url: string
}

const useSellProductViewModel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  const [images, setImages] = useState<ImageType[]>(data? data.images : [])
  const [title, setTitle] = useState(data ? data.title : '');
  const [price, setPrice] = useState(data ? data.price : '');
  const [contents, setContents] = useState(data ? data.contents : '');
  const [priceSuggest, setPriceSuggest] = useState(data ? data.priceSuggest : true);
  const [share, setShare] = useState(data ? data.share : false);
  const [classifId, setClassifId] = useState<number>(data ? data.classifId : 0);

  const { userLatLng } = useCustomContext();
  const { getId, getLocation } = useJwtDecode();

  const seller_id = useMemo(() => getId(), [getId]);
  const seller_location = useMemo(() => getLocation(), [getLocation]);
  const activeLocation = useMemo(() => getActiveLocation(), [])

  const createProduct = useMutation(productApi.createProduct);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    
    if (fileList && fileList[0]) {
      for (let file of fileList) {
        const image: ImageType = {data: file, url: URL.createObjectURL(file)};

        setImages((prev: any) => [...prev, image])
      }
    }
  }

  const deleteImage = (index: number) => {
    const list = [...images];
    list.splice(index, 1);
    setImages(list);
  }

  const handleClickSubmit = () => {
    const imageFiles = images.map(item => item.data);

    (title !== '' && classifId !== 0 && contents !== '')  &&
    createProduct.mutate({
      image: imageFiles,
      seller_id,
      seller_location,
      title,
      price: price === '' ? 0 : parseInt(price),
      contents,
      wanted_location: JSON.stringify(userLatLng),
      price_suggest: priceSuggest,
      share,
      classif_id: classifId,
    },
    {
      onSuccess: () => navigate('/home')
    })
  }

  return {
    images,
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
    uploadImage,
    deleteImage,
    handleClickSubmit,
    isLoading: createProduct.isLoading,
  }
}

export default useSellProductViewModel;