import './Field.scss'
import classNames from 'classnames'
import * as events from "node:events";

interface props {
  setText?: (e : any) => void,
  textValue?: string,
  inputRef?: any,
  label?: string
}

function Field(props : props) {
  const {
    setText,
    textValue,
    inputRef,
    label
  } = props

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



