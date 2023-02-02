import styled from 'styled-components';
import iconNext from '@carrot/core/assets/icon/mycarrot/Navigate next.svg';

const CarrotPay = () => {
    return ( 
        <Contain>
            <Comment>
                <span>바니하는  새로운  방법  ,  바니페이!</span>
                <Next src= {iconNext} alt="" />

            </Comment> 
            <Btns>
                <Btn>+ 충전</Btn>
                <Btn>￦ 계좌송금</Btn>
            </Btns>
        </Contain>
    )
};

export default CarrotPay;

const Contain = styled.div`
height: 100px;
border: 1px solid lightgray;
border-radius: 8px;
margin: 5px 15px;
font-size: 17px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Comment = styled.div`
width: 100%;
height: 30px;
padding-left: 20px;
padding-bottom: 16px;
display: flex;
justify-content: space-between;;
align-items: center;
`

const Next = styled.img`
wwidth: 30px;
height: 30px;
`

const Btns = styled.div`
width: 100%;
display: flex;
justify-content: center;

`

const Btn = styled.div`
display: inline-block;
width: 46%;
padding: 10px 0;
border-radius: 5px;
text-align: center;
margin: 0 5px;
background: #eeeeee;
`