import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import theme from '../../style/theme'


type DropboxType = 'CUSTOM' | 'CUSTOM'

interface DropboxProps extends PropsWithChildren {
  type: DropboxType
  className?: string
  value?: string
  label?: string
  options?: string[]
  defaultValue?: string
  onChange?: (value: string) => void
}

const Dropbox: React.FC<DropboxProps> = (props) => {
  if (props.type === 'CUSTOM') {
    return (
      <Wrapper className={props.className}>
      {props.label && <Label>{props.label}</Label>}
      <DropboxSelect
        onChange={(e) => {
          props.onChange && props.onChange(e.target.value)
        }}
        value={props.value}
        defaultValue={props.value}
      >
        {props.children}
      </DropboxSelect>
    </Wrapper>
    )
  }
  else
  return (
    <Wrapper className={props.className}>
      {props.label && <Label>{props.label}</Label>}
      <DropboxSelect
        onChange={(e) => {
          props.onChange && props.onChange(e.target.value)
        }}
        value={props.value}
        defaultValue={props.value}
      >
        {props.options && props.options.map((opt) => (
          <option>{opt}</option>
        ))}
      </DropboxSelect>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Label = styled.p`
  ${theme.typography.body2}
  color: ${theme.colors.grey70};
  margin-bottom: 1.2rem;
`

const DropboxSelect = styled.select`
  width: 100%;
  background-color: white;
  padding: 0.8rem 2rem;
  ${theme.typography.body2};

  -webkit-appearance: none; /* 사파리, 크롬 하위버전용 */
  -moz-appearance: none; /* 사파리, 크롬 하위버전용 */
  box-sizing: border-box;
`

export default Dropbox
