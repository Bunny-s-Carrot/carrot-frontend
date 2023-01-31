import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import productApi from "../../../api/product";


const useProductDetailViewModel = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLImageElement>(null);
  const params = useParams<{ product_id: string }>();
  const [isOpenPopup, openPopup] = useState(false);
  const [isOpenModal, openModal] = useState(false);
  const { data, isSuccess } = useQuery(['product', params.product_id], () =>
    productApi.getProductDetail(params.product_id!))

  const { data: imageData, isSuccess: getImageSuccess } = useQuery(['product/image', params.product_id], () =>
    productApi.getImageList(params.product_id!))

  const deleteProduct = useMutation(productApi.deleteProduct);

  const handleOpenPopup = (e: React.MouseEvent) => {
    if (!isOpenPopup && (e.target === dotsRef.current)) {
      openPopup(true);
    } 
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
    isOpenPopup,
    handleOpenPopup,
    handleClosePopup,
    isOpenModal,
    openModal,
  }
}

export default useProductDetailViewModel;