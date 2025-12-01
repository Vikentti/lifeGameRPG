import './DailyQuest.scss'

import classNames from 'classnames'
import React, {useState} from "react";

import DailyQuestPopUp from "../../components/DailyQuestPopUp/DailyQuestPopUp";
import {DailyQuestTasks} from "./DailyQuestTasks";
import Button from "../../components/Button/Button";


interface DailyQuestProps {
  className?: string
}

const DailyQuest = ({className}: DailyQuestProps) => {


  const [tasks, setTasks] = useState(DailyQuestTasks)
  const [activeTab, setActiveTab] = useState(0)
  const [activePopUp, setActivePopUp] = useState(false)

  const handleToggleVisible = (index: number) => {
    setTasks(prevTasks =>
      prevTasks.map((item, i) =>
        i === index
          ? {...item, visible: !item.visible}
          : item
      )
    );
  };

  const filteredTasks = tasks.filter((item) => item.visible === true)

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
        tasks={tasks}
        active={activePopUp}
        close={togglePopUp}
      />
    </div>
  )
}

export default DailyQuest