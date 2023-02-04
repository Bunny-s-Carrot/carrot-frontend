import React, { ChangeEventHandler, PropsWithChildren } from "react";
import styled from "styled-components";

interface FileInputProps extends PropsWithChildren {
  className?: string
  accept?: string
  multiple?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onClick?: () => void
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  return (
    <FileInputLabel
      className={props.className}
      htmlFor='file-input'
      onClick={props.onClick}>
      <input
        name='file-input'
        type='file'
        accept={props.accept}
        multiple={props.multiple}
        onChange={props.onChange}
        ref={ref}
      />
      {props.children}
    </FileInputLabel>
  )
})

export default FileInput;

const FileInputLabel = styled.label`

  input[type='file'] {
    display: none;
  }
`