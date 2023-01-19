import styled from 'styled-components'
import theme from '../../style/theme'
import { ChangeEventHandler, KeyboardEventHandler } from 'react'

interface TextInputProps {
  value?: string;
  inputType?: string;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onChangeValue?: (value: string) => void;
  onFocus?: () => void;
  disabled?: boolean;
  onKeyup?: KeyboardEventHandler;
  className?: string;
  isMultiLine?: boolean;
  required?: boolean;
  disableBorder?: boolean;
}

function TextInput(props: TextInputProps) {
  if (props.isMultiLine) {
    return (
      <TextInputWrapper
        className={props.className}
        onSubmit={(e) => {
          e.preventDefault()
          return false
        }}
        disableBorder={props.disableBorder}
      >
        <textarea
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => {
            props.onChangeValue && props.onChangeValue(e.target.value)
          }}
          required={props.required}
          onFocus={props.onFocus}
          onKeyUp={props.onKeyup}
          disabled={props.disabled}
        />
      </TextInputWrapper>
    )
  }

  return (
    <TextInputWrapper
      className={props.className}
      onSubmit={(e) => {
        e.preventDefault()
        return false
      }}
      disableBorder={props.disableBorder}
    >
      <input
        value={props.value}
        type={props.inputType || 'text'}
        placeholder={props.placeholder}
        onChange={props.onChange as ChangeEventHandler<HTMLInputElement>}
        required={props.required}
        onFocus={props.onFocus}
        onKeyUp={props.onKeyup}
        disabled={props.disabled}
      />
    </TextInputWrapper>
  )
}
export default TextInput

const TextInputWrapper = styled.div<{ disableBorder: boolean | undefined}>`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  font-size: 1.6rem;
  input {
    box-sizing: border-box;
    width: 100%;
    min-height: 4.2rem;
    border: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey30}`};
    border-radius: 0.8rem;

    outline: none;
    ::placeholder {
      color: ${theme.colors.grey40};
      ${theme.typography.body2};
    }
    :focus {
      border: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey90}`};
      
    }
    :active {
      border: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey90}`};
    }
    :disabled {
      background-color: white;
      ::placeholder {
      color: ${theme.colors.grey90};
      }
    }
  }
  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 15rem;
    border: none;
    border-bottom: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey40}`};
    outline: none;
    ${theme.colors.grey90};
    ${theme.typography.body3};
    ::placeholder {
      color: ${theme.colors.grey40};
      ${theme.typography.body3};
    }
    :focus {
      border: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey90}`};
      border-radius: 0.8rem;
    }
    :active {
      border: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey90}`};
      border-radius: 0.8rem;
    }
    :disabled {
      background-color: white;
      border: none;
      ::placeholder {
      color: ${theme.colors.grey90};
      }
    }
  }
`
