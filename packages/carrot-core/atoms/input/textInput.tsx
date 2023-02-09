import styled from 'styled-components'
import theme from '../../style/theme'
import { forwardRef, ChangeEventHandler, KeyboardEventHandler } from 'react'

interface TextInputProps {
  value?: string;
  rows?: number;
  inputType?: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChangeValue?: (value: string) => void;
  onFocus?: () => void;
  disabled?: boolean;
  onKeyup?: KeyboardEventHandler;
  className?: string;
  isMultiLine?: boolean;
  required?: boolean;
  disableBorder?: boolean;
}

const TextInput = forwardRef<HTMLTextAreaElement, TextInputProps>((props, ref) => {
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
          onChange={props.onChange}
          required={props.required}
          onFocus={props.onFocus}
          onKeyUp={props.onKeyup}
          disabled={props.disabled}
          rows={props.rows}
          ref={ref}
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
})

export default TextInput

const TextInputWrapper = styled.div<{ disableBorder: boolean | undefined}>`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  font-size: 1.6rem;
  input {
    padding: 0.4rem 1.6rem;
    ${theme.typography.body3};
    box-sizing: border-box;
    width: 100%;
    min-height: 4.2rem;
    border: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey30}`};

    outline: none;
    ::placeholder {
      color: ${theme.colors.grey40};
      ${theme.typography.body3};
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
    padding: 0 1.6rem;
    ${theme.typography.body3};
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-bottom: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey40}`};
    outline: none;
    ::placeholder {
      color: ${theme.colors.grey40};
      ${theme.typography.body3};
    }
    :focus {
      border: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey90}`};

    }
    :active {
      border: ${props => props.disableBorder ? 'none' : `0.1rem solid ${theme.colors.grey90}`};

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
