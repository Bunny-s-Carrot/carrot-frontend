import styled from "styled-components";
import HeaderTemplate from "../../templates/headerTemplate";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import { useNavigate } from "react-router-dom";

const SellProductPage = () => {
  const navigate = useNavigate();
  const leftContent = 
    <div>
      <img src={backIcon} alt='backIcon' />
    </div>
  return (
    <HeaderTemplate
      leftContent={leftContent}
      onClickLeft={() => navigate(-1)}
    ></HeaderTemplate>
  )
}

export default SellProductPage;

const Container = styled.div`

`