import './DailyQuest.scss'

import classNames from 'classnames'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Button from "../../components/Button/Button";
import DailyQuestPopUp from "../../components/DailyQuestPopUp/DailyQuestPopUp";
import type {Category} from "../../states/Daily/DailySlice";
import {
  toggleCategoryVisibility
} from "../../states/Daily/DailySlice";
import type {RootState} from "../../states/store";


interface DailyQuestProps {
  className?: string
}

const DailyQuest = ({className}: DailyQuestProps) => {


  const [activeTab, setActiveTab] = useState(0)
  const [activePopUp, setActivePopUp] = useState(false)


  const dispatch = useDispatch()
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

  const filteredTasks = categoriesForUI.filter(cat => cat.visible);

  const handleToggleVisible = (categoryKey: Category) => {
    dispatch(toggleCategoryVisibility(categoryKey));
  };


  const activeCategory = filteredTasks[activeTab]

  const togglePopUp = () => {
    setActivePopUp(!activePopUp)
  }



  return (
    <div
      className={classNames(className, 'daily-quest')}
    >


      <div className="daily-quest__choose">
        <h1 className="daily-quest__title">Your daily quests</h1>
        <Button
          type="button"
          title="Choose"
          onClick={togglePopUp}
        />
      </div>


      <div className="daily-quest__body">
        <ul className="daily-quest__list">
          {filteredTasks.map((item, index) => (
            <li
              className={classNames("daily-quest__item", {
                'is-active': activeTab === index
              })}
              key={index}
              onClick={() => setActiveTab(index)}
            >{item.title}</li>
          ))}
        </ul>
        <div className="daily-quest__content">
          {activeCategory && (
            <>
              <h3 className="daily-quest__content-title">{activeCategory.title}</h3>
              <ul className="daily-quest__content-list">
                {activeCategory.tasks.map((task, taskIndex) => (
                  <li
                    className="daily-quest__content-item"
                    key={taskIndex}
                  >{task.title}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>


      <DailyQuestPopUp
        onClick={handleToggleVisible}
        tasks={categoriesForUI}
        active={activePopUp}
        close={togglePopUp}
      />
    </div>
  )
}

export default DailyQuest