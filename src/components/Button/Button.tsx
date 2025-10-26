import './Button.scss'
import classNames from 'classnames'
import {type ButtonHTMLAttributes, forwardRef} from "react";

type ButtonType = "button" | "submit" | "reset"

interface ButtonProps {
  className?: string
  title?: string
  onClick?: () => void
  type: ButtonType
  ref?: null
}



const Button =
  forwardRef<HTMLButtonElement, ButtonProps>
  ((props: ButtonProps, ref ) => {
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
      ref={ref}
    >
      {title}
    </button>
  )
})

export default Button