import styled from "styled-components";
import theme from "../../style/theme";

interface OptionListProps {
  emoji: string;
  content: string;
}

interface OptionButtonProps {
  className?: string;
  optionListProps: OptionListProps[];
  optionListProps2?: OptionListProps[];
}

const OptionButton = (props: OptionButtonProps) => {
  return (
    <Wrapper className={props.className}>
      <ul>
        {props.optionListProps.map((item, index) => (
          <li key={index}>
            <span>{item.emoji}</span>
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
      {props.optionListProps2 && 
        <ul>
        {props.optionListProps2?.map((item, index) => (
          <li key={index}>
            <span>{item.emoji}</span>
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
      }
      
    </Wrapper>
  )
}

export default OptionButton;

const Wrapper = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  position: absolute;
  z-index: 10;
  bottom: 14rem;
  right: 1.6rem;

  ul {
    padding: 0.4rem 1.6rem;
    background: white;
    border-radius: 1.4rem;
  }
  
  li {
    padding: 0.8rem 0;
    display: flex;
    gap: 0.8rem;
  }

  span {
    ${theme.typography.body3};

  }
`