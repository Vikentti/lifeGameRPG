import './DailyQuest.scss'
import classNames from 'classnames'
import React, {useEffect} from "react";
import Button from "../../components/Button/Button";
import DailyQuestPopUp from "../../components/DailyQuestPopUp/DailyQuestPopUp";
import DailyQuestTaskItem from "../../components/DailyQuestTaskItem/DailyQuestTaskItem";
import {useDailyData} from "../../hookes/useDaily/useDailyData";
import {useDailyActions} from "../../hookes/useDaily/useDailyActions";
import {useDailyCategories} from "../../hookes/useDaily/useDailyCategories";
import {useCategoryCompletion} from "../../hookes/useDaily/useCategoryCompletion";
import {useDailyTabs} from "../../hookes/useDaily/useDailyTabs";

interface DailyQuestProps {
  className?: string
}

const DailyQuest = ({className}: DailyQuestProps) => {
  const {
    activeCategoryPopUp,
    activeTab,
    setActiveTab,
    togglePopUp
  } = useDailyData();

  const {categoriesForUI, filteredTasks} = useDailyCategories();
  const {testResetDay, setDailyDone, handleToggleVisible} = useDailyActions();

  // Получаем activeCategory из хука
  const { activeCategory } = useDailyTabs(filteredTasks, activeTab, setActiveTab);

  useCategoryCompletion(activeCategory);

  useEffect(() => {
    if (filteredTasks.length > 0 && activeTab >= filteredTasks.length) {
      setActiveTab(0);
    }
  }, [filteredTasks.length, activeTab, setActiveTab]);

  return (
    <div className={classNames(className, 'daily-quest')}>
      <div className="daily-quest__choose">
        <h1 className="daily-quest__title">Your daily quests</h1>
        <Button
          type="button"
          title="Choose"
          onClick={togglePopUp}
        />
        <Button
          type='button'
          title="reset"
          onClick={testResetDay}
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
            >
              {item.title}
            </li>
          ))}
        </ul>
        <div className="daily-quest__content">
          {activeCategory ? (
            <>
              <ul className="daily-quest__content-list">
                {activeCategory.tasks && activeCategory.tasks.map((task: any, taskIndex: number) => (
                  <li
                    className="daily-quest__content-item"
                    key={taskIndex}
                  >
                    <DailyQuestTaskItem
                      title={task.title}
                      isDone={task.isDone}
                      setDone={() => setDailyDone(activeCategory.categoryKey, task.id)}
                      category={activeCategory.categoryKey}
                      id={task.id}
                      stat={task.stat}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>No active category selected or no tasks available</div>
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
  );
};

export default DailyQuest;