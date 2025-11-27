import './Button.scss'

import classNames from 'classnames'
import React from 'react';
import {forwardRef} from "react";

type ButtonType = "button" | "submit" | "reset"

interface ButtonProps {
  className?: string
  title?: string
  onClick?: () => void
  type?: ButtonType
  ref?: null
  mod?: string
}


const Button =
  forwardRef<HTMLButtonElement, ButtonProps>
  ((props, ref) => {
    const {
      className,
      title,
      onClick,
      type = "button",
      mod
    } = props

    return (
      <button
        className={classNames(className, 'button', {
          [` button--${mod}`]: mod
        })}
        type={type}
        onClick={onClick}
        ref={ref}
      >
        {title}
      </button>
    )
  })

Button.displayName = 'Button'

export default Button