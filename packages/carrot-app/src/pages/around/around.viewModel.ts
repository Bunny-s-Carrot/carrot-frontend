import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const useAroundViewModel = () => {
  const navigate = useNavigate();
  const handleClickInput = () => {
    toast.success('HIHI')
    navigate('/home')
  }
  return {
    handleClickInput
  }
}

export default useAroundViewModel