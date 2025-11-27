import './HpBar.scss'

import classNames from 'classnames'
import React from "react";

interface HpBarProps {
  className?: string
  hp: number
  maxHp: number
}

const HpBar = ({className, hp, maxHp}: HpBarProps) => {

  const currentHp = hp / (maxHp / 100)

  return (
    <div
      className={classNames(className, 'hp-bar')}
    >
      <div className="hp-bar__health">
        <div className="hp-bar__health-all"></div>
        <div
          className="hp-bar__health-current"
          style={{'--currentHp': currentHp} as React.CSSProperties}
        ></div>
      </div>
      <div className="hp-bar__numbers">{hp}/{maxHp}</div>
    </div>
  )
}

export default HpBar