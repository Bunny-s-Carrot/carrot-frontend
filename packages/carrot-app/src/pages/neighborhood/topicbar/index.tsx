import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import HeaderTemplate from '../../../templates/headerTemplate'
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';

const TopicBarDetailPage = () => {
    const navigate = useNavigate();

    const leftContent = (
        <>
            <img src={backIcon} alt='backIcon' onClick={() => navigate(-1)}/>
        </>
    )

    return (
        <StyledHeaderTemplate
        leftContent={leftContent}>
          1
        </StyledHeaderTemplate>
    )
};

export default TopicBarDetailPage;

const StyledHeaderTemplate =styled(HeaderTemplate)`
Title {
    border: 1px solid black;
}
`