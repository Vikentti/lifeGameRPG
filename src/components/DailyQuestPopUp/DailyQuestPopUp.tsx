import './DailyQuestPopUp.scss'

import classNames from 'classnames'
import React from "react";
import {useSelector} from "react-redux";

import type {Category} from "../../states/Daily/DailySlice";
import type {RootState} from "../../states/store";
import Button from "../Button/Button";

interface TasksInterface {
  title: string,
  tasks: {title: string, stat: string}[]
  visible: boolean
  categoryKey: Category
}

interface DailyQuestPopUpProps {
  className?: string
  tasks: TasksInterface[] // Use proper type instead of any[]
  onClick: (categoryKey: Category) => void // Update type to accept index
  close: () => void
  active: boolean
}


const DailyQuestPopUp = ({className, tasks, onClick, close, active}: DailyQuestPopUpProps) => {

  if (!active) {
    return null
  }


  const daily = useSelector((state: RootState) => state.daily)

  const categoriesForUI = [
    {
      title: "Strength",
      tasks: daily.strength.daily,
      visible: daily.strength.visible,
      currentDay: daily.strength.currentDay,
      categoryKey: 'strength' as Category
    },
    {
      title: "Dexterity",
      tasks: daily.dexterity.daily,
      visible: daily.dexterity.visible,
      currentDay: daily.dexterity.currentDay,
      categoryKey: 'dexterity' as Category
    },
    {
      title: "Intelligence",
      tasks: daily.intelligence.daily,
      visible: daily.intelligence.visible,
      currentDay: daily.intelligence.currentDay,
      categoryKey: 'intelligence' as Category
    },
    {
      title: "Health",
      tasks: daily.health.daily,
      visible: daily.health.visible,
      currentDay: daily.health.currentDay,
      categoryKey: 'health' as Category
    },
    {
      title: "Social Skills",
      tasks: daily.social.daily,
      visible: daily.social.visible,
      currentDay: daily.social.currentDay,
      categoryKey: 'social' as Category
    }
  ];


  return (
    <div className={classNames(className, 'daily-quest-pop-up')}>
      <ul className="daily-quest-pop-up__list">
        {categoriesForUI.map((item, index) => (
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