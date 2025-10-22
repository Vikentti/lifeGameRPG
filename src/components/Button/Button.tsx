import './Button.scss'
import classNames from 'classnames'
import type {ButtonHTMLAttributes} from "react";

type ButtonType = "button" | "submit" | "reset"

interface props {
  className?: string
  title?: string
  onClick?: () => void
  type: ButtonType
}



function Button(props : props) {
  const {
    className,
    title,
    onClick,
    type = "button",
  } = props

  return (
    <button
      className={classNames(className, 'button')}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button