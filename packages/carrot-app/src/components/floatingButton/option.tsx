import styled from "styled-components";
import OptionButton from "@carrot/core/atoms/floatingButton/OptionButton";
import { NavType } from "../navBar";
import FABOption from "../../infra/floatingButton/FABOptionLists";


interface OptionProps {
  type: NavType;
  className?: string;
}

const Option = (props: OptionProps) => {
  if (props.type === 'HOME') {
    return (
      <Wrapper className={props.className}>
        <OptionButton 
          optionListProps={FABOption.homeOption.slice(0, 5)}
          optionListProps2={FABOption.homeOption.slice(5)}
        />
      </Wrapper>
    )
  }

  else if (props.type === 'NEIGHBORHOOD') {
    return (
      <Wrapper className={props.className}>
        <OptionButton 
          optionListProps={FABOption.neighborhoodOption.slice(0, 1)}
          optionListProps2={FABOption.neighborhoodOption.slice(1)}
        />
      </Wrapper>
    )
  }

  else if (props.type === 'AROUND') {
    return (
      <Wrapper className={props.className}>
        <OptionButton 
          optionListProps={FABOption.aroundOption}
        />
      </Wrapper>
    )
  }

  else return null;
}

export default Option;

const Wrapper = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`