import { ChangeEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';

interface InputProps {
  className?: string;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string
}

const SearchInput = (props: InputProps) => {
  return (
    <Wrapper className={props.className}>
      <input
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </Wrapper>
  )
}

export default SearchInput;

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    min-height: 2.4rem;
    ${theme.typography.body3};
    border: none;

    :focus {
      outline: none;
    }

    :active {
      outline: none;
    }

    ::placeholder {
      color: ${theme.colors.grey40};
    }
  }
`