import './CompletePopUp.scss'
import classNames from 'classnames'
import React from "react";

interface CompletePopUpProps {
  className?: string
  isActive: boolean
  title: string
  xp: number,
  stat?: string
}

const CompletePopUp = ({className, isActive, title,xp , stat}: CompletePopUpProps) => {


  return (
    <div
      className={classNames(className, 'complete-pop-up', {
        'is-active': isActive
      })}
    >
      <div className="compete-pop-up__body">
        <div className="compete-pop-up__title">Congregation you completed {title}</div>
        <div className="compete-pop-up__stats">
          <p className="compete-pop-up__text"></p>
          <div className="compete-pop-up__stats-xp">XP: {xp}</div>
          {stat && (
            <div className="compete-pop-up__stats-stat">{stat}: 10</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompletePopUp