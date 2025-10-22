import './Field.scss'
import classNames from 'classnames'
import * as events from "node:events";

interface props {
  setText?: (e : any) => void,
  textValue?: string,
  inputRef?: any,
}

function Field(props : props) {
  const {
    setText,
    textValue,
    inputRef,
  } = props

  return (

      <div className="all-tasks__actions field">
        <label
          className="field__label"
          htmlFor="name"
        >Add new Boss (Task)
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



