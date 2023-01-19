import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import HeaderTemplate from '../../../templates/headerTemplate';
import Panel from "../../../components/panel";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';


const WritePostPage = () => {
    const navigate = useNavigate();

    const leftContent = (
    <>
      <img src={backIcon} alt='backIcon' onClick={() => navigate(-1)}/>
      <Head>동네생활 글쓰기</Head>
    </>
    )
        
    const rightContent = (
    <>
      <Done type="submit" form="content">완료</Done>
    </>
    )

    return (
        <HeaderTemplate
        leftContent={leftContent}
        rightContent={rightContent}>
            <StyledPanel type="CUSTOM">게시글의 주제를 선택해주세요</StyledPanel>
            <form id="content" action="http://localhost:5000/createpost">
                <Content name="content" placeholder='연희동 관련된 질문이나 이야기를 해보세요.'/>
            </form>
        </HeaderTemplate>
    )
};

export default WritePostPage;

const Head = styled.span`
font-size: 21px;
margin-left: 6px;`

const Done = styled.button`
font-size: 18px;
`

const StyledPanel = styled(Panel)`

span {
    font-size: 16.5px;
    font-weight: 300;
    margin-left: -14px;
}

img {
    width: 11px;
}

width: 94%;
margin: 0 3%;
`

const Content = styled.textarea`
width: 100%;
height: 100vh;
border: none;
padding: 18px 13px;
font-size: 16.5px;

::placeholder {
    color: ${theme.colors.grey50}
}

:focus {
    outline: none;
}
`
