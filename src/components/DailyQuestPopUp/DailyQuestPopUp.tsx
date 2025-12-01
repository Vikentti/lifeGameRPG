import './DailyQuestPopUp.scss'

import classNames from 'classnames'
import React from "react";
import Button from "../Button/Button";

interface TasksInterface {
  title: string,
  tasks: {title: string, stat: string}[]
  visible: boolean
}

interface DailyQuestPopUpProps {
  className?: string
  tasks: TasksInterface[] // Use proper type instead of any[]
  onClick: (index: number) => void // Update type to accept index
  close: () => void
  active: boolean
}


const DailyQuestPopUp = ({className, tasks, onClick, close, active}: DailyQuestPopUpProps) => {

  if (!active) {
    return null
  }


  return (
    <div className={classNames(className, 'daily-quest-pop-up')}>
      <ul className="daily-quest-pop-up__list">
        {tasks.map((item, index) => (
          <li
            className={classNames(className, "daily-quest-pop-up__item", {
              'is-active': item.visible
            })}
            key={index}
            onClick={() => onClick(index)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <Button type="button" title="Accept Change" onClick={close} mod="wide"/>
    </div>
  )
}

export default DailyQuestPopUp