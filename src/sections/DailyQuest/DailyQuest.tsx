import './DailyQuest.scss'

import classNames from 'classnames'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Button from "../../components/Button/Button";
import DailyQuestPopUp from "../../components/DailyQuestPopUp/DailyQuestPopUp";
import {
  type Category,
  completeCategoryReward,
  forceResetDailyAll,
  setCategoryItemDone,
} from "../../states/Daily/DailySlice";
import {
  toggleCategoryVisibility
} from "../../states/Daily/DailySlice";
import type {RootState} from "../../states/store";
import DailyQuestTaskItem
  from "../../components/DailyQuestTaskItem/DailyQuestTaskItem";
import {onKill} from "../../states/User/userSlice";
import {
  useCompletePopUp
} from "../../hookes/CompletePopUpContext/useCompletePopUp";


interface DailyQuestProps {
  className?: string
}

const DailyQuest = ({className}: DailyQuestProps) => {


  const [activeTab, setActiveTab] = useState(0)
  const [activeCategoryPopUp, setCategoryActivePopUp] = useState(false)

  const {setCompletePopUp} = useCompletePopUp()

  const dispatch = useDispatch()
  const daily = useSelector((state: RootState) => state.daily)


  const categoriesForUI = [
    {
      title: "Strength",
      tasks: daily.strength?.daily || [],
      visible: daily.strength?.visible || false,
      currentDay: daily.strength?.currentDay || 1,
      categoryKey: 'strength' as Category,
      rewardGiven: daily.strength?.rewardGiven || false
    },
    {
      title: "Dexterity",
      tasks: daily.dexterity?.daily || [],
      visible: daily.dexterity?.visible || false,
      currentDay: daily.dexterity?.currentDay || 1,
      categoryKey: 'dexterity' as Category,
      rewardGiven: daily.dexterity?.rewardGiven || false
    },
    {
      title: "Intelligence",
      tasks: daily.intelligence?.daily || [],
      visible: daily.intelligence?.visible || false,
      currentDay: daily.intelligence?.currentDay || 1,
      categoryKey: 'intelligence' as Category,
      rewardGiven: daily.intelligence?.rewardGiven || false
    },
    {
      title: "Health",
      tasks: daily.health?.daily || [],
      visible: daily.health?.visible || false,
      currentDay: daily.health?.currentDay || 1,
      categoryKey: 'health' as Category,
      rewardGiven: daily.health?.rewardGiven || false
    },
    {
      title: "Social Skills",
      tasks: daily.social?.daily || [],
      visible: daily.social?.visible || false,
      currentDay: daily.social?.currentDay || 1,
      categoryKey: 'social' as Category,
      rewardGiven: daily.social?.rewardGiven || false
    }
  ];
  const filteredTasks = categoriesForUI.filter(cat => cat.visible);

  useEffect(() => {
    if (filteredTasks.length > 0 && activeTab >= filteredTasks.length) {
      setActiveTab(0)
    }

  }, [filteredTasks.length, activeTab])

  const activeCategory = filteredTasks[activeTab]

  const handleToggleVisible = (categoryKey: Category) => {
    dispatch(toggleCategoryVisibility(categoryKey));
  };



  const togglePopUp = () => {
    setCategoryActivePopUp(!activeCategoryPopUp)
  }

  const setDailyDone = (category: Category, id: string) => {
    dispatch(setCategoryItemDone({category: category, taskId: id}))
  }


  useEffect(() => {
    if (activeCategory &&
      activeCategory.tasks.every(item => item.isDone) &&
      !activeCategory.rewardGiven) {

      const uniqueStats = [...new Set(
        activeCategory.tasks
          .filter(item => item.stat)
          .map(item => item.stat)
      )];

      if (uniqueStats.length > 0) {
        dispatch(onKill({stat: uniqueStats.toString(), howMuch: 5, xp: 60}))
        setCompletePopUp(uniqueStats.toString(), 60, 5, 'Daily Completed', false)
        dispatch(completeCategoryReward(activeCategory.categoryKey));


      }
    }
  }, [activeCategory, dispatch, setCompletePopUp]);

  const testResetDay = () => {
    dispatch(forceResetDailyAll())
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
        <Button type='button' title="reset" onClick={testResetDay} />
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
              <ul className="daily-quest__content-list">
                {activeCategory.tasks.map((task, taskIndex) => (
                  <li
                    className="daily-quest__content-item"
                    key={taskIndex}
                  ><DailyQuestTaskItem
                    title={task.title}
                    isDone={task.isDone}
                    setDone={setDailyDone}
                    category={activeCategory.categoryKey}
                    id={task.id}
                    stat={task.stat}
                  /></li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>


      <DailyQuestPopUp
        onClick={handleToggleVisible}
        tasks={categoriesForUI}
        active={activeCategoryPopUp}
        close={togglePopUp}
      />


    </div>
  )
}

export default DailyQuest