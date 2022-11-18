import styled from 'styled-components';

const CarrotPay = () => {
    return ( 
        <Contain>
            <Comment>당근하는  새로운  방법  ,  당근페이!</Comment> 
            <Btns>
                <Btn>+ 충전</Btn>
                <Btn>@ 계좌송금</Btn>
            </Btns>
        </Contain>
    )
};

export default CarrotPay;

const Contain = styled.div`
height: 130px;
border: 1px solid lightgray;
border-radius: 8px;
margin: 5px 15px;
font-size: 17px;
display: flex;
flex-direction: column;
align-items: center;
`

const Comment = styled.div`
height: 30px;
`
const Btns = styled.div`
width: 100%;
display: flex;
justify-content: center;

`

const Btn = styled.div`
display: inline-block;
width: 42%;
padding: 10px 0;
border-radius: 7px;
text-align: center;
margin: 0 10px;
background: #eeeeee;
`