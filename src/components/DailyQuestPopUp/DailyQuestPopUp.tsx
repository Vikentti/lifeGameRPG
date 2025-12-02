import './DailyQuestPopUp.scss'

import classNames from 'classnames'
import React from "react";

import type {Category} from "../../states/Daily/DailySlice";
import Button from "../Button/Button";

interface TasksInterface {
  title: string,
  tasks: {title: string, stat: string}[]
  visible: boolean
  categoryKey: Category
}

interface DailyQuestPopUpProps {
  className?: string
  tasks: TasksInterface[]
  onClick: (categoryKey: Category) => void
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
            onClick={() => onClick(item.categoryKey)}
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