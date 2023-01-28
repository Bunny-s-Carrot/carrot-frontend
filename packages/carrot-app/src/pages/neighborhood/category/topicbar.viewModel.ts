import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query';
import postApi from '../../../api/post';

const useTopicViewModel = () => {
    const params = useParams<{ classif_id: string }>();


    const { data } = useQuery(['post', params.classif_id], () => 
    postApi.getPostsByCategory(params.classif_id!));

    return {
      data
    }
}

export default useTopicViewModel;