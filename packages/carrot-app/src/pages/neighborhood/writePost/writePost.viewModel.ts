import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postApi from '../../../api/post';
import useJwtDecode from '../../../hooks/auth/useJwtDecode';

interface ImageType {
  data: File,
  url: string
}

const useWritePostViewModel = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const { getId } = useJwtDecode();
  const writer_id = getId();
    
  const writePost = useMutation(postApi.createPost);

  const handleClickSubmit = () =>  {
    const imageFiles = images.map(item => item.data);

    content !== '' && writePost.mutate({
      image: imageFiles,
      writer_id,
      content,
      classif_id: 2001
    },
    {
        onSuccess: () => navigate('/neighborhood')
    })
  }

  const [images, setImages] = useState<ImageType[]>([]);

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

    return {
        images,
        setContent,
        handleClickSubmit,
        uploadImage,
        deleteImage
    }
}

export default useWritePostViewModel;