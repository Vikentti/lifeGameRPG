import './TasksDetails.scss'

import classNames from "classnames";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";

import BossCard from "../../../src/components/BossCard/BossCard";
import Button from "../../../src/components/Button/Button";
import CompletePopUp from "../../../src/components/CompletePopUp/CompletePopUp";
import Field from "../../../src/components/Field/Field";
import HydrationTasks
  from "../../../src/components/HydrationTasks/HydrationTasks";
import TasksList from "../../../src/components/TasksList/TasksList";
import {
  CompletePopUpContext
} from "../../../src/hookes/CompletePopUpContext/CompletePopUpContext";
import {useEnemies} from "../../../src/hookes/useEnemies";
import {
  addMiniBoss,
  selectedTotalMiniBoss
} from "../../../src/states/boss/miniBossSlice";
import {addMob, selectedTotalMobs} from "../../../src/states/boss/mobsSlice";
import type {AppDispatch, RootState} from "../../../src/states/store";


const TasksDetails = () => {

  const {taskId} = useParams()
  const navigate = useNavigate()

  const {bosses, miniBosses, mobs} = useEnemies()

  const dispatch: AppDispatch = useDispatch()
  const [textValue, setTextValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeType, setActiveType] = useState<'mob' | 'miniBoss'>('mob')

  const {
    activePopUp,
    popUpTitle,
    xpGained,
    characteristic,
  } = useContext(CompletePopUpContext)


  const label = `Add new ${activeType === 'mob' ? 'Mob' : 'Mini Boss'}`

  const handleActiveTypeMob = () => {
    setActiveType('mob')
    inputRef.current?.focus()
  }

  const handleActiveTypeMiniBoss = () => {
    setActiveType('miniBoss')
    inputRef.current?.focus()
  }

  const task = useMemo(() => {
    return bosses.bosses.find(t => t.id === taskId)
  }, [bosses.bosses, taskId])


  const handlerChange = (e: any) => {
    setTextValue(e.target.value)
  }

  const handleAddTask = (e: any) => {
    e.preventDefault()
    if (textValue.trim() !== '' && taskId) {

      const type = activeType === 'miniBoss'
        ? {hp: Math.floor(Math.random() * (100 - 50) + 50), action: addMiniBoss}
        : {hp: Math.floor(Math.random() * (50 - 20) + 20), action: addMob}

      dispatch(type.action({
        title: textValue,
        bossId: taskId,
        hp: type.hp,
        stat: task ? task.stat : ''
      }))

      setTextValue('')
      inputRef.current?.focus()
    }
  }

  const mobsArr = useMemo(() =>
      mobs?.mobs.filter((i) => i.bossId === taskId) ?? [],
    [mobs.mobs, taskId]
  )
  const miniBossArr = useMemo(() =>
      miniBosses?.miniBosses.filter((i) => i.bossId === taskId) ?? [],
    [miniBosses.miniBosses, taskId]
  )


  const totalMiniBosses = useSelector((state: RootState) =>
    selectedTotalMiniBoss(state, taskId ? taskId : "")
  )

  const totalMobs = useSelector((state: RootState) =>
    selectedTotalMobs(state, taskId ? taskId : '')
  )

  useEffect(() => {
    if (!task) {
      navigate('/allTasks')
    }
  }, [task, navigate]);

  if (!task) {
    return <div>Задача не найдена!</div>
  }

  const miniBossLeft = miniBossArr.length
  const mobsLeft = mobsArr.length
  const stat = task?.stat


  return (
    <HydrationTasks>
      <div
        className='tasks-details'
      >
        <BossCard
          title={task.title}
          hp={task.hp}
          stat={stat}
          maxHp={task.maxHp}
          leftMini={miniBossLeft}
          totalMini={totalMiniBosses}
          leftMobs={mobsLeft}
          totalMobs={totalMobs}
          boss={task}
        />
        <div className="tasks-details__body">
          <form
            className="tasks-details__form"
            onSubmit={handleAddTask}
          >
            <Field
              setText={handlerChange}
              textValue={textValue}
              inputRef={inputRef}
              label={label}
            />

            <div className="tasks-details__form-types">
              <p className="tasks-details__form-types-text">Choose Task Difficulty</p>
              <Button
                className={classNames('tasks-details__form-types-button', {
                  'is-active': activeType === 'mob'
                })}
                type={"button"}
                onClick={() => handleActiveTypeMob()

                }
                title="Mob"
                mod="wide"
              />
              <Button
                className={classNames('tasks-details__form-types-button', {
                  'is-active': activeType === 'miniBoss'
                })}
                type={"button"}
                onClick={() => handleActiveTypeMiniBoss()}
                title="Mini Boss"
                mod="wide"
              />

            </div>
            <Button
              className="tasks-details__form-submit-button"
              type={"submit"}
              title="Add"
            />
          </form>

          <div className="tasks-details__list">
            {mobsArr.length > 0 && <div className="tasks-details__list-mobs">
              <h3 className="tasks-details__list-title">Mobs</h3>
              <TasksList arrayToMap={mobsArr} />
            </div>}

            {miniBossArr.length > 0 &&
              <div className="tasks-details__list-mini-boss">
                <h3 className="tasks-details__list-title">Mini Bosses</h3>
                <TasksList
                  arrayToMap={miniBossArr}
                  isMiniBoss
                />
              </div>}

          </div>
        </div>

      </div>
      <CompletePopUp
        isActive={activePopUp}
        title={popUpTitle}
        xp={xpGained}
        stat={characteristic}

      />
    </HydrationTasks>
  )
}

export default TasksDetails