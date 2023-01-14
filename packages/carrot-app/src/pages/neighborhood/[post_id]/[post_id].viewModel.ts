import { useQuery } from "@tanstack/react-query";
import postApi from "../../../api/post";
import { useParams } from "react-router-dom";

const usePostDetailViewModel = () => {
  const params = useParams<{ post_id: string }>();

  const { data } = useQuery(['post', params.post_id], () => 
    postApi.getPostDetail(params.post_id!))
  return {
    data: data?.payload
  }
}

export default usePostDetailViewModel;