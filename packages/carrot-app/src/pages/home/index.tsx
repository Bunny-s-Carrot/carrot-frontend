import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import NavBar from "../../components/navBar";
import HeaderTemplate from "../../templates/headerTemplate";
import Product from "../../components/product/productList";

import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import searchIcon from '@carrot/core/assets/icon/search.svg';
import menuIcon from '@carrot/core/assets/icon/menu.svg';
import notiIcon from '@carrot/core/assets/icon/notification.svg';
import theme from "@carrot/core/style/theme";

import useProductViewModel from "./home.viewModel";
import FloatingButton from "../../components/floatingButton";


const Home = () => {
  const navigate = useNavigate();
  const productViewModel = useProductViewModel();
  const results = productViewModel.data?.payload;

  const LeftContent = (
    <LocationWrapper>
      <p>연희동</p>
      <img className='down' src={backIcon} alt='backIcon' />
    </LocationWrapper>
  )

  const RightContent = (
    <IconWrapper>
      <img src={searchIcon} alt='searchIcon' />
      <img src={menuIcon} alt='profileIcon' />
      <img src={notiIcon} alt='notiIcon' />
    </IconWrapper>
  )

  return (
    <>
      <HeaderTemplate
        leftContent={LeftContent}
        onClickLeft={() => navigate('')}
        rightContent={RightContent}
      >
        <Container>
          {results?.map((item, index) => (
            <Product
              key={index}
              title={item.title}
              price={item.price}
              created_at={item.created_at}
              seller_location={item.lowest_sect_name}
              heart={item.heart}
              chat={item.chat}
              onClick={() => navigate(`/product/${item.product_id}`, { state: {locationName: item.lowest_sect_name} })}
            />
          ))}
          <div style={{ height: '1000px' }}></div>
        </Container>
      </HeaderTemplate>
      <FloatingButton pageType='HOME' />
      <NavBar pageType='HOME' />
    </>
  )
};

export default Home;

const Container = styled.div`
  position: relative;
  padding: 0 1.6rem;
`

const LocationWrapper = styled.div`
  padding: 0.3rem;
  display: flex;
  align-items: center;

  &:hover {
    background: ${theme.colors.grey30};
    cursor: pointer;
  }
`
const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`