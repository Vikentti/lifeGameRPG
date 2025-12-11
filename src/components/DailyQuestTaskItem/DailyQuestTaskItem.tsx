import './DailyQuestTaskItem.scss'
import classNames from 'classnames'
import React from "react";
import type {Category} from "../../states/Daily/DailySlice";
import {useDispatch} from "react-redux";
import {onKill} from "../../states/User/userSlice";
import {
  useCompletePopUp
} from "../../hookes/CompletePopUpContext/useCompletePopUp";

interface DailyQuestTaskItemProps {
  className?: string
  title: string,
  isDone: boolean,
  id: string,
  category: Category
  setDone: (category: Category, id: string) => void
  stat: string
}

const DailyQuestTaskItem = ({
                              className,
                              title,
                              isDone,
                              setDone,
                              category,
                              id,
                              stat
                            }: DailyQuestTaskItemProps) => {

  const dispatch= useDispatch()

  const {setCompletePopUp} = useCompletePopUp()

  const onCheckboxChange = () => {
    setDone(category, id)
    setCompletePopUp(stat, 15, 1, 'Daily Quest', false)
    dispatch(onKill({stat: stat, howMuch: 1, xp : 15}))
  }


  return (
    <div className={classNames(
      className,
      'daily-quest-task-item',
      { 'daily-quest-task-item--checked': isDone }
    )}>
      <label
        className="daily-quest-task-item__label"
        htmlFor={id}
      >
        <span className="daily-quest-task-item__title">{title}</span>
        <div className="daily-quest-task-item__checkbox-wrapper">
          <input
            className="daily-quest-task-item__checkbox-input"
            type='checkbox'
            checked={isDone}
            onChange={onCheckboxChange}
            id={id}
            disabled={isDone}
          />
          <span className="daily-quest-task-item__check-visual">
            <svg
              className="daily-quest-task-item__check-icon"
              width="12"
              height="9"
              viewBox="0 0 12 9"
            >
              <polyline
                points="1 5 4 8 11 1"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </span>
        </div>
      </label>
    </div>
  )
}

export default DailyQuestTaskItem