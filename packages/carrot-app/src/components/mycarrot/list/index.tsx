import styled from "styled-components"
import iconReceipt from '@carrot/core/assets/icon/mycarrot/Receipt.svg';
import iconBag from '@carrot/core/assets/icon/mycarrot/Shopping Bag.svg';
import iconHeart from '@carrot/core/assets/icon/mycarrot/Heart.svg';
import iconView from '@carrot/core/assets/icon/mycarrot/View.svg';
import iconBook from '@carrot/core/assets/icon/mycarrot/Book.svg';
import iconPost from '@carrot/core/assets/icon/mycarrot/Post add.svg';
import iconStore from '@carrot/core/assets/icon/mycarrot/Storefront.svg';
import iconCampaign from '@carrot/core/assets/icon/mycarrot/Campaign.svg';
import iconArticle from '@carrot/core/assets/icon/mycarrot/Article.svg';
import iconRoom from '@carrot/core/assets/icon/mycarrot/Room.svg';
import iconLocation from '@carrot/core/assets/icon/mycarrot/Location searching.svg';
import iconLabel from '@carrot/core/assets/icon/mycarrot/Label.svg';
import iconSupport from '@carrot/core/assets/icon/mycarrot/Support agent.svg';
import iconEmail from '@carrot/core/assets/icon/mycarrot/Email.svg';


const listdata = [
{
    title: '나의 거래',
    list : [{
        name : '판매내역',
        icon : iconReceipt
    },
    {
        name : '구매내역',
        icon : iconBag
    },
    {
        name : '관심목록',
        icon : iconHeart
    },
    {
        name : '모아보기',
        icon : iconView
    },
    {
        name : '바니가계부',
        icon : iconBook
    }]
},
{
    title: '나의 동네생활',
    list : [{
        name : '동네생활 글/댓글',
        icon : iconPost
    }]
},
{
    title: '나의 비즈니스',
    list : [{
        name : '비즈프로필 관리',
        icon : iconStore
    },
    {
        name : '광고',
        icon : iconCampaign
    },
    {
        name : '동네홍보 글',
        icon : iconArticle
    }]
},
{
    title: '기타',
    list : [{
        name : '내 동네 설정',
        icon : iconRoom
    },
    {
        name : '동네 인증하기',
        icon : iconLocation
    },
    {
        name : '알림 키워드 설정',
        icon : iconLabel
    },
    {
        name : '자주 묻는 질문',
        icon : iconSupport
    },
    {
        name : '친구초대',
        icon : iconEmail
    }]
},
];


const MycarrotList = () => {
    return (
        <Contain>
            
            {listdata.map((item, index) => (
                <OneList key={index}>
                    <Title>{item.title}</Title>
                    <ul>
                        {item.list.map((item, index) => (
                            <List key={index}>
                                <Icon src={item.icon} alt='icon'/>
                                <span>{item.name}</span>
                            </List>
                        ))}
                    </ul>
                </OneList>
            ))}
        </Contain>);
};

export default MycarrotList;

const Contain = styled.div`
overflow: visible;
`

const OneList = styled.div`
border-bottom: 1px solid lightgray;
font-size: 20px;
padding: 10px 12px;
`

const Title = styled.h1`
font-size: 23px;
font-weight: 500;
margin: 15px 0;
`

const List = styled.div`
    padding: 20px 0;
    display: flex;
    align-items: center;
    &:hover {
        background: #eeeeee;
        cursor: pointer;
    }
`

const Icon = styled.img`
width: 30px;
height: 30px;
margin-right: 12px;
`