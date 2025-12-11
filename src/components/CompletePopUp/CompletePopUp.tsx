import './CompletePopUp.scss'

import classNames from 'classnames'
import React from "react";

interface CompletePopUpProps {
  className?: string
  isActive: boolean
  title: string
  xp: number
  stat?: string
  howMuch?: number
  isBigPopUp?: boolean
}

const CompletePopUp = ({
                         className,
                         isActive,
                         title,
                         xp,
                         stat,
                         isBigPopUp,
                         howMuch
                       }: CompletePopUpProps) => {

  return (
    <div
      className={classNames(className, 'complete-pop-up', {
        'is-active': isActive,
        'complete-pop-up--big': isBigPopUp
      })}
    >
      {isBigPopUp && <div className="complete-pop-up__body">
        <div className="complete-pop-up__title">Congregation you killed <span className="complete-pop-up__title-span">{title}</span></div>
        <div className="complete-pop-up__stats">
          <p className="complete-pop-up__text">Earned:</p>
          <div className="complete-pop-up__stats-body">
            <div className="complete-pop-up__stats-xp">XP: {xp}</div>
            {stat !== 'undefined' && (
              <div className="complete-pop-up__stats-stat">{stat}: {howMuch}</div>
            )}
          </div>

        </div>
      </div>}
      {!isBigPopUp &&
        <div className="complete-pop-up__stats--alt">
          <p className="complete-pop-up__text">Earned:</p>
          <div className="complete-pop-up__stats-body">
            <div className="complete-pop-up__stats-xp">XP:{xp}</div>
            {stat !== 'undefined' && (
              <div className="complete-pop-up__stats-stat">{stat}:{howMuch}</div>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default CompletePopUp