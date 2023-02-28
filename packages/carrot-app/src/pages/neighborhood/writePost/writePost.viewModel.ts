import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postApi from '../../../api/post';
import useJwtDecode from '../../../hooks/auth/useJwtDecode';
import { getActiveLocationId } from '../../../infra/location/locationData';

interface ImageType {
  data: File;
  url: string;
}

const useWritePostViewModel = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [category, setCategory] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { getId } = useJwtDecode();
  const writer_id = getId();
  const writer_location = getActiveLocationId() as string;

  const writePost = useMutation(postApi.createPost);

  const handleClickSubmit = () => {
    const imageFiles = images.map((item) => item.data);

    content !== '' &&
      category !== null &&
      writePost.mutate(
        {
          image: imageFiles,
          writer_id,
          content,
          classif_id: category,
          writer_location,
        },
        {
          onSuccess: () => navigate('/neighborhood'),
        },
      );
  };

  const [images, setImages] = useState<ImageType[]>([]);

  const uploadImage = () => {
    const fileList = fileInputRef.current?.files;

    if (fileList && fileList[0]) {
      for (let file of fileList) {
        const image: ImageType = { data: file, url: URL.createObjectURL(file) };

        setImages((prev: any) => [...prev, image]);
      }
    }
  };

  const deleteImage = (index: number) => {
    const list = [...images];
    list.splice(index, 1);
    setImages(list);
  };

  return {
    images,
    fileInputRef,
    setContent,
    setCategory,
    handleClickSubmit,
    uploadImage,
    deleteImage,
  };
};

export default useWritePostViewModel;
