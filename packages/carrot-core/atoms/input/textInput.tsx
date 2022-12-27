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
function TextInput({
                       inputType,
                       placeholder,
                       onChange,
                       onFocus,
                       onKeyup,
                       disabled,
                       value,
                       className,
                       isMultiLine,
                       onChangeValue,
                   }: TextInputProps) {
    if (isMultiLine) {
        return (
            <TextInputWrapper
                className={className}
                onSubmit={(e) => {
                    e.preventDefault()
                    return false
                }}
            >
                <div>
          <textarea
              value={value}
              placeholder={placeholder}
              onChange={(e) => {
                  onChangeValue && onChangeValue(e.target.value)
              }}
              required
              onFocus={onFocus}
              onKeyUp={onKeyup}
              disabled={disabled}
          />
                </div>
            </TextInputWrapper>
        )
    }

    return (
        <TextInputWrapper
            className={className}
            onSubmit={(e) => {
                e.preventDefault()
                return false
            }}
        >
            <div>
                <input
                    value={value}
                    type={inputType || 'text'}
                    placeholder={placeholder}
                    onChange={onChange as ChangeEventHandler<HTMLInputElement>}
                    required
                    onFocus={onFocus}
                    onKeyUp={onKeyup}
                    disabled={disabled}
                />
            </div>
        </TextInputWrapper>
    )
}
export default TextInput

const TextInputWrapper = styled.form`
  position: relative;
  box-sizing: border-box;
  input {
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-bottom: 0.1rem solid ${theme.colors.grey40};
    padding: 1.2rem 1.6rem;
    outline: none;
    :focus {
      border: 0.2rem solid ${theme.colors.grey40};
      border-radius: 0.8rem;
    }
    :active {
      border: 0.2rem solid ${theme.colors.grey90};
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
  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 15rem;
    border: none;
    border-bottom: 0.1rem solid ${theme.colors.grey40};
    padding: 1.2rem 1.6rem;
    outline: none;
    ${theme.colors.grey90};
    ${theme.typography.body2};
    ::placeholder {
      color: ${theme.colors.grey50};
      ${theme.typography.body2};
    }
    :focus {
      border: 0.2rem solid ${theme.colors.grey90};
      border-radius: 0.8rem;
    }
    :active {
      border: 0.2rem solid ${theme.colors.grey40};
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
