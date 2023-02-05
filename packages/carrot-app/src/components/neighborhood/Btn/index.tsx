import styled from "styled-components";
import heartgreyIcon from "@carrot/core/assets/icon/heart-grey.svg";
import heartorangeIcon from "@carrot/core/assets/icon/heart-orange.svg";
import thumbgreyIcon from "@carrot/core/assets/icon/Thumb-grey.svg";
import thumborangeIcon from "@carrot/core/assets/icon/Thumb-orange.svg";

interface BtnProps {
    type: String;
    now: boolean | undefined;
    onClick?: () => void;
}

const Button = (props: BtnProps) => {
    if (props.type === 'heart' && props.now !== undefined) {
        return (
        <Container 
          now={props.now}
          onClick={props.onClick}
        >
          <Icon src={props.now? heartorangeIcon : heartgreyIcon}/>
          &nbsp; 관심 {props.now? 1 : ""}
        </Container>
    )} else if (props.type === 'empa' && props.now !== undefined) {
        return (
        <Container 
          now={props.now}
          onClick={props.onClick}
        >
          <Icon src={props.now? thumborangeIcon : thumbgreyIcon}/>
          &nbsp; 공감하기
        </Container>
    )} else {
        return (
            <></>
        )
    }
};

export default Button;

const Container = styled.div<{ now: boolean }>`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
  font-size: 12px;
  color: ${props => props.now ? '#f57f17' : '#9e9e9e'};
`
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;