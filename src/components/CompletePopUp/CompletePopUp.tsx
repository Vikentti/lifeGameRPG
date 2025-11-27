import './CompletePopUp.scss'

import classNames from 'classnames'
import React from "react";

interface CompletePopUpProps {
  className?: string
  isActive: boolean
  title: string
  xp: number,
  stat?: string
  isBig?: boolean
}

const CompletePopUp = ({
                         className,
                         isActive,
                         title,
                         xp,
                         stat,
                         isBig
                       }: CompletePopUpProps) => {

  return (
    <div
      className={classNames(className, 'complete-pop-up', {
        'is-active': isActive
      })}
    >
      {isBig && <div className="complete-pop-up__body">
        <div className="complete-pop-up__title">Congregation you killed <span className="complete-pop-up__title-span">{title}</span></div>
        <div className="complete-pop-up__stats">
          <p className="complete-pop-up__text">Earned:</p>
          <div className="complete-pop-up__stats-body">
            <div className="complete-pop-up__stats-xp">XP: {xp}</div>
            {stat && (
              <div className="complete-pop-up__stats-stat">{stat}: 10</div>
            )}
          </div>

        </div>
      </div>}
      {!isBig &&
        <div className="complete-pop-up__stats--alt">
          <p className="complete-pop-up__text">Earned:</p>
          <div className="complete-pop-up__stats-body">
            <div className="complete-pop-up__stats-xp">XP: {xp}</div>
            {stat && (
              <div className="complete-pop-up__stats-stat">{stat}: 10</div>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default CompletePopUp