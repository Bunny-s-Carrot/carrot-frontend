import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productApi from "../../../api/product";
import useJwtDecode from "../../../hooks/auth/useJwtDecode";
import heartApi from "../../../api/heart";


const useProductDetailViewModel = () => {
  const params = useParams<{ product_id: string }>();
  const popupRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLImageElement>(null);
  const [isOpenPopup, openPopup] = useState(false);
  const [isOpenModal, openModal] = useState(false);
  const [isHeartOn, setHeartOn] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { getId } = useJwtDecode();
  const loginId = getId();

  const { data, isSuccess } = useQuery(['product', params.product_id], () =>
  productApi.getProductDetail(params.product_id as string));

  const { data: heartData, isSuccess: getHeartSuccess } = useQuery(['heart'], 
    async () => await heartApi.getHeart('product', params.product_id as string, loginId));

  useEffect(() => {
    getHeartSuccess && setHeartOn(heartData.heart)
  }, [getHeartSuccess, heartData?.heart])

  const { data: imageData, isSuccess: getImageSuccess } = useQuery(['product/image', params.product_id], () =>
    productApi.getImageList(params.product_id as string))
  const updateHeart = useMutation(heartApi.updateHeart);
  const deleteProduct = useMutation(productApi.deleteProduct);

  const handleOpenPopup = (e: React.MouseEvent) => {
    if (!isOpenPopup && (e.target === dotsRef.current)) {
      openPopup(true);
    } 
  }

  const handleClickHeart = () => {
    setHeartOn((prev: boolean) => {
      updateHeart.mutate({
        type: 'product',
        user_id: loginId,
        id: params.product_id as string,
        plus: !prev
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([`heart`])
        } 
      })

      return !prev;
    })

  }

  const handleClosePopup = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (isOpenPopup && (!popupRef.current?.contains(target))) {
      openPopup(false);
    }
    if (e.target === dotsRef.current) {
      openPopup(true);
    }
  }, [isOpenPopup]);

  useEffect(() => {
    window.addEventListener('click', handleClosePopup);
    return () => {
      window.removeEventListener('click', handleClosePopup)
    }
  }, [handleClosePopup])
  

  return {
    dotsRef,
    popupRef,
    data: data?.payload,
    isSuccess,
    imageData,
    getImageSuccess,
    deleteProduct,
    isHeartOn,
    handleClickHeart,
    isOpenPopup,
    handleOpenPopup,
    handleClosePopup,
    isOpenModal,
    openModal,
  }
}

export default useProductDetailViewModel;