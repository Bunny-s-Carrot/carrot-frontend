import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postApi from '../../../api/post';
import useJwtDecode from '../../../hooks/auth/useJwtDecode';


const useWritePostViewModel = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const { getId } = useJwtDecode();
  const writer_id = getId();
    
  const writePost = useMutation(postApi.createPost);

  const handleClickSubmit = () =>  {
    content !== '' && writePost.mutate({
      writer_id,
      content,
      classif_id: 2001
    },
    {
        onSuccess: () => navigate('/neighborhood')
    })
  }


    return {
        setContent,
        handleClickSubmit,
    }
}

export default useWritePostViewModel;