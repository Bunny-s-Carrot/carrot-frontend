import { useNavigate } from "react-router-dom";
import HeaderTemplate from "../../../templates/headerTemplate";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import Modal from "../../../components/modal";
import useSettingViewModel from "./setting.viewModel";
import useToken from "../../../hooks/auth/useToken";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";

const SettingPage = () => {
  const navigate = useNavigate();
  const settingViewModel = useSettingViewModel();
  const { logout } = useToken();
  const leftContent = 
  <>
    <img src={backIcon} alt='backIcon' />
    <span>설정</span>
  </>

  return (
    <>
      <HeaderTemplate
        leftContent={leftContent}
        onClickLeft={() => navigate(-1)}
      >
        <SettingListWrapper>
          <Title>알림 설정</Title>
          <ul>
            <ListItem
              onClick={() => navigate('notiandsound')}
            >
              <span>알림 및 소리</span>
            </ListItem>
            <ListItem>
              <span>방해금지 시간설정</span>
            </ListItem>
            <ListItem>
              <span>진동</span>
            </ListItem> 
          </ul>
        </SettingListWrapper>
        <SettingListWrapper>
          <Title>사용자 설정</Title>
          <ul>
            <ListItem
              onClick={() => navigate('account')}
            >
              <span>계정 / 정보 관리</span>
            </ListItem>
            <ListItem
              onClick={() => navigate('collected-users')}
            >
              <span>모아보기 사용자 관리</span>
            </ListItem> 
            <ListItem
              onClick={() => navigate('blocked-users')}
            >
              <span>차단 사용자 관리</span>
            </ListItem> 
            <ListItem
              onClick={() => navigate('unexposed-users')}
            >
              <span>게시글 미노출 사용자 관리</span>
            </ListItem> 
            <ListItem
              onClick={() => navigate('etc')}
            >
              <span>기타 설정</span>
            </ListItem> 
          </ul>
        </SettingListWrapper>
        <SettingListWrapper>
          <Title>기타</Title>
          <ul>
            <ListItem
              onClick={() => navigate('announcement')}
            >
              <span>공지사항</span>
            </ListItem>
            <ListItem>
              <span>국가 변경</span>
            </ListItem>
            <ListItem>
              <span>언어 설정</span>
            </ListItem>
            <ListItem>
              <span>앱 캐시 정리하기</span>
            </ListItem> 
            <ListItem>
              <span>오픈소스 라이선스</span>
            </ListItem>
            <ListItem
              onClick={() => settingViewModel.openModal(true)}
            >
              <span>로그아웃</span>
            </ListItem>
            <ListItem>
              <span>틸퇴하기</span>
            </ListItem> 
          </ul>
        </SettingListWrapper>
      </HeaderTemplate>
      {settingViewModel.isOpenModal &&
      <Modal
        query='로그아웃 하시겠습니까?'
        onClickLeft={() => settingViewModel.openModal(false)}
        onClickRight={() => {
          settingViewModel.openModal(false);
          logout().then(res => res.status === 200
            && navigate('/'));
          
          
        }}
        buttonText="로그아웃"
      />}
    </>
    
  )
}

export default SettingPage;

const SettingListWrapper = styled.div`
  width: 100%;
  padding: 1.6rem 0;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
`
const Title = styled.div`
  padding: 0 1.6rem;
  margin-bottom: 2rem;
  ${theme.typography.caption1};
  font-weight: bold;
`
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
  ${theme.typography.body3};

  :hover {
    background: ${theme.colors.grey30};
    cursor: pointer;
  }
`