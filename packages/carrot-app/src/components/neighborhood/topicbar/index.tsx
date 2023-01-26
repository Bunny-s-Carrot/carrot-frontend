import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import { postcategoryList } from "../../../infra/postcategory/postcategoryList";

import menuIcon from "@carrot/core/assets/icon/menu.svg";
import boltIcon from "@carrot/core/assets/icon/Bolt.svg";

interface Props {
  controlModal: any;
}

const TopicBar = ({ controlModal }: Props) => {
  const navigate = useNavigate();

  return (
    <TopicContainer>
      {postcategoryList.map((item, index) => {
        if (index == 0) {
          return (
            <TopicItem key={index} onClick={() => controlModal(true)}>
              <Icon src={menuIcon} alt="" />
              {item.title}
            </TopicItem>
          );
        } else if (index == 1) {
          return (
            <TopicItem key={index} onClick={() => navigate(`${item.path}`)}>
              <Icon src={boltIcon} alt="" />
              {item.title}
            </TopicItem>
          );
        } else {
          return (
            <TopicItem key={index} onClick={() => navigate(`${item.path}`)}>
              {item.title}
            </TopicItem>
          );
        }
      })}
    </TopicContainer>
  );
};

export default TopicBar;

const TopicContainer = styled.div`
  height: 62px;
  border-bottom: 1px solid ${theme.colors.grey30};
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 7px 0 15px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TopicItem = styled.div`
  display: inline-block;
  font-size: 15px;
  padding: 8px 9px;
  margin-right: 8px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.grey30};
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 2px;
`;
