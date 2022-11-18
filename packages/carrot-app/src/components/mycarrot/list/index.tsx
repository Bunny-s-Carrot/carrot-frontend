import styled from "styled-components"
import heart from '@carrot/core/assets/icon/heart.svg';

const listdata = [
{
    title: '나의 거래',
    list : [{
        name : '판매내역123',
        icon : heart
    },
    {
        name : '구매내역',
        icon : heart
    },
    {
        name : '관심목록',
        icon : heart
    },
    {
        name : '모아보기',
        icon : heart
    },
    {
        name : '당근가계부',
        icon : heart
    }]
}
];


const MycarrotList = () => {
    return (
        <Contain>
            
            {listdata.map((item) => (
                <OneList>
                    <Title>{item.title}</Title>
                    <ul>
                        {item.list.map((item) => (
                            <List>
                                <img src={item.icon} alt='icon'/>
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
    padding: 20px 3px;
    &:hover {
        background: #eeeeee;
        cursor: pointer;
    }
`