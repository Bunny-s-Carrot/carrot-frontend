import styled from 'styled-components'
import theme from '../../style/theme'
import { ChangeEventHandler, KeyboardEventHandler } from 'react'

interface TextInputProps {
  value?: string
  inputType?: string
  placeholder: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onChangeValue?: (value: string) => void
  onFocus?: () => void
  disabled?: boolean
  onKeyup?: KeyboardEventHandler
  className?: string
  isMultiLine?: boolean
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
      >
        <textarea
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => {
            props.onChangeValue && props.onChangeValue(e.target.value)
          }}
          required
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
    >
      <input
        value={props.value}
        type={props.inputType || 'text'}
        placeholder={props.placeholder}
        onChange={props.onChange as ChangeEventHandler<HTMLInputElement>}
        required
        onFocus={props.onFocus}
        onKeyUp={props.onKeyup}
        disabled={props.disabled}
      />
    </TextInputWrapper>
  )
}
export default TextInput

const TextInputWrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  font-size: 1.6rem;
  input {
    box-sizing: border-box;
    width: 100%;
    min-height: 4.2rem;
    border: 0.1rem solid ${theme.colors.grey30};
    border-radius: 0.8rem;
    padding: 0.8rem 1.6rem;
    outline: none;
    ::placeholder {
      font-size: 1.6rem;
    }
    :focus {
      border: 0.1rem solid ${theme.colors.grey90};
      
    }
    :active {
      border: 0.1rem solid ${theme.colors.grey90};
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
    border-bottom: 0.1rem solid ${theme.colors.grey40};
    padding: 0.8rem 1.6rem;
    outline: none;
    ${theme.colors.grey90};
    ${theme.typography.body2};
    ::placeholder {
      color: ${theme.colors.grey50};
      ${theme.typography.body2};
    }
    :focus {
      border: 0.1rem solid ${theme.colors.grey90};
      border-radius: 0.8rem;
    }
    :active {
      border: 0.1rem solid ${theme.colors.grey90};
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
