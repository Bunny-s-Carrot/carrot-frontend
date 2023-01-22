import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import theme from '../../style/theme'

interface CheckboxProps extends PropsWithChildren {
  className?: string
  disabled?: boolean
  checked?: boolean
  readOnly?: boolean
  onClick?: () => void

}

const CheckBox = (props: CheckboxProps) => {
  return (
    <CheckboxLabel className={props.className} onClick={props.onClick}>
      <Checkbox 
        type='checkbox'
        checked={props.checked}
        disabled={props.disabled}
        readOnly={props.readOnly}
      >
      </Checkbox>
      <span>{props.children}</span>
    </CheckboxLabel>

  )
}

export default CheckBox

const CheckboxLabel = styled.label`

  color: ${theme.colors.grey90};
  display: flex;
  align-items: center;
  gap: 1.4rem;

  span {
    flex-shrink: 0;
    justify-self: flex-end;
  }
`
const Checkbox = styled.input`
  margin: 0;
  width: 2rem;
  height: 2rem;
  border-color: ${theme.colors.grey10};
  accent-color: ${theme.colors.carrot};
  }

  :checked {
    background: ${theme.colors.carrot};
    color: white;
`
