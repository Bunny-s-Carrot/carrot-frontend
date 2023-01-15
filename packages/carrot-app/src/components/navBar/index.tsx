import styled from "styled-components";

import icHome from '@carrot/core/assets/icon/home-outline.svg';
import icHomeActive from '@carrot/core/assets/icon/home-filled.svg';
import icNeighborhood from '@carrot/core/assets/icon/neighborhood-outline.svg';
import icNeighborhoodActive from '@carrot/core/assets/icon/neighborhood-filled.svg';
import icLocation from '@carrot/core/assets/icon/location-pin-outline.svg';
import icLocationActive from '@carrot/core/assets/icon/location-pin-filled.svg';
import icChatBubble from '@carrot/core/assets/icon/chat-outline.svg';
import icChatBubbleActive from '@carrot/core/assets/icon/chat-filled.svg';
import icMyCarrot from '@carrot/core/assets/icon/myCarrot-outline.svg';
import icMyCarrotActive from '@carrot/core/assets/icon/myCarrot-filled.svg';
import { useNavigate } from "react-router-dom";

export type NavType = 'HOME' | 'NEIGHBORHOOD' | 'AROUND' | 'CHAT' | 'MYCARROT'

export interface NavProps {
  pageType: NavType
}

const navListData = [
  {
    type: 'HOME',
    title: '홈',
    icon: icHome,
    iconActive: icHomeActive,
    path: '/home',
  },
  {
    type: 'NEIGHBORHOOD',
    title: '동네생활',
    icon: icNeighborhood,
    iconActive: icNeighborhoodActive,
    path: '/neighborhood',
  },
  {
    type: 'AROUND',
    title: '내 근처',
    icon: icLocation,
    iconActive: icLocationActive,
    path: '/around',
  },
  {
    type: 'CHAT',
    title: '채팅',
    icon: icChatBubble,
    iconActive: icChatBubbleActive,
    path: '/chat',
  },
  {
    type: 'MYCARROT',
    title: '나의 당근',
    icon: icMyCarrot,
    iconActive: icMyCarrotActive,
    path: '/mycarrot'
  },
]

const NavBar = ({ pageType }: NavProps) => {
  const navigate = useNavigate();
  return (
    <NavContainer>
      {navListData.map((item, index) => (
        <NavItem
          key={index}
          onClick={() => navigate(item.path)}
        >
          <img
            src={pageType === item.type ? item.iconActive : item.icon}
            alt='nav-item'
          />
          <span>{item.title}</span>
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
`
const NavItem = styled.div`
  height: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  img {
    width: 2.4rem;
    height: 2.4rem;
  }
  span {
    font-size: 1.2rem;
  }
`