import { useQuery } from '@tanstack/react-query';
import postApi from '../../api/post';

const usePostViewModel = () => {

    const { data } = useQuery(['post'], postApi.getPosts)

    return {
      data
    }
}

export default usePostViewModel;