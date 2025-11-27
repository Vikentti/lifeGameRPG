import './Field.scss'

import React from "react";

interface fieldProps {
  setText?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  textValue?: string,
  inputRef?: React.Ref<HTMLInputElement>,
  label?: string
}

const Field = ({
                 setText,
                 textValue,
                 inputRef,
                 label
               }: fieldProps) => {


  return (

    <div className="all-tasks__actions field">
      <label
        className="field__label"
        htmlFor="name"
      >{label}
      </label>
      <input
        className="field__input"
        id="name"
        name="name"
        placeholder=" "
        autoComplete="off"
        onChange={setText}
        value={textValue}
        ref={inputRef}
      />
    </div>
  )
}

export default Field



