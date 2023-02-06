import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { useQuery } from "@tanstack/react-query";
import postApi from "../../../api/post";
import { useParams } from "react-router-dom";
import useJwtDecode from '../../../hooks/auth/useJwtDecode';


const usePostDetailViewModel = () => {
  const params = useParams<{ post_id: string, comment_id: string }>();

  const [ content, setContent ] = useState("");
  const { getId } = useJwtDecode();
  const writer_id = getId();
  const { data } = useQuery(['post', params.post_id], () => 
    postApi.getPostDetail(params.post_id!, writer_id));

  const { data: ImageData, isSuccess: getImageSuccess } = useQuery(['post/image', params.post_id], () => 
  postApi.getImageList(params.post_id!))
  const post_id = parseInt(params.post_id!)
  const mother_id = parseInt(params.comment_id!)
  
  const writeComment = useMutation(postApi.createComment);
  const writeRecomment = useMutation(postApi.createRecomment);

  const commmentSubmit = () => {
    content !== '' && writeComment.mutate({
      post_id,
      writer_id,
      content,
    },
    {
      onSuccess: () => window.location.reload()
    })
  }

  const recommmentSubmit = () => {
    content !== '' && writeRecomment.mutate({
      post_id,
      writer_id,
      content,
      mother_id
    },
    {
      onSuccess: () => window.location.reload()
    })
  }

  const heart = useMutation(postApi.updateHeart);
  
  const Upheart = () => {
    heart.mutate({
      user_id: writer_id,
      post_id,
      plus: true
    })
  }

  const Downheart = () => {
    heart.mutate({
      user_id: writer_id,
      post_id,
      plus: false
    })
  }

  const [empanow, setEmpanow] = useState(false);
  const empa = useMutation(postApi.updateEmpa);
  
  const UpEmpa = () => {
    empa.mutate({
      user_id: writer_id,
      post_id,
      plus: true
    })
  }

  const DownEmpa = () => {
    empa.mutate({
      user_id: writer_id,
      post_id,
      plus: false
    })
  }

  return {
    data,
    content,
    ImageData,
    getImageSuccess,
    setContent,
    commmentSubmit,
    recommmentSubmit,
    Upheart,
    Downheart,
    UpEmpa,
    DownEmpa,
    empanow,
    setEmpanow
  }
}

export default usePostDetailViewModel;