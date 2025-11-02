import './TasksDetails.scss'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useRef, useState} from "react";
import type {AppDispatch, RootState} from "../../../src/states/store";
import Button from "../../../src/components/Button/Button";
import TasksList from "../../../src/components/TasksList/TasksList";
import Field from "../../../src/components/Field/Field";
import {addMob, selectedTotalMobs} from "../../../src/states/boss/mobsSlice";
import {
  addMiniBoss,
  selectedTotalMiniBoss
} from "../../../src/states/boss/miniBossSlice";
import classNames from "classnames";
import HydrationTasks
  from "../../../src/components/HydrationTasks/HydrationTasks";
import BossCard from "../../../src/components/BossCard/BossCard";


const TasksDetails = () => {

  const {taskId} = useParams()
  const tasks = useSelector((state: RootState) => state.bosses.bosses)
  const miniBoss = useSelector((state: RootState) => state.miniBosses.miniBosses)
  const mobs = useSelector((state: RootState) => state.mobs.mobs)
  const dispatch: AppDispatch = useDispatch()
  const [textValue, setTextValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeType, setActiveType] = useState<'mob' | 'miniBoss'>('mob')


  const label = `Add new ${activeType === 'mob' ? 'Mob' : 'Mini Boss'}`

  const task = useMemo(() => {
    return tasks.find(t => t.id === taskId)
  }, [tasks, taskId])

  if (!task) {
    return <div>Задача не найдена!</div>
  }

  const stat = task.stat


  const bossHp = task.hp
  const bossMaxHp = task.maxHp

  const handlerChange = (e: any) => {
    setTextValue(e.target.value)
  }

  const handleAddTask = (e: any) => {
    e.preventDefault()
    if (textValue.trim() !== '' && taskId) {

      if (activeType === 'mob') {
        dispatch(addMob({
          title: textValue,
          bossId: taskId,
          hp: Math.floor(Math.random() * (50 - 20) + 20)
        }))
      } else {
        dispatch(addMiniBoss({
          title: textValue,
          bossId: taskId,
          hp: Math.floor(Math.random() * (100 - 50) + 50)
        }))
      }

      setTextValue('')
      inputRef.current?.focus()
    }
  }

  const mobsArr = [...mobs].filter((i) => i.bossId === taskId)
  const miniBossArr = [...miniBoss].filter((i) => i.bossId === taskId)

  const miniBossLeft = miniBossArr.length
  const mobsLeft = mobsArr.length


  const totalMiniBosses = useSelector((state: RootState) =>
    selectedTotalMiniBoss(state, taskId ? taskId : "")
  )

  const totalMobs = useSelector((state: RootState) =>
    selectedTotalMobs(state, taskId ? taskId : '')
  )


  return (
    <HydrationTasks>
      <div
        className='tasks-details'
      >
        <BossCard
          title={task.title}
          leftMini={miniBossLeft}
          totalMini={totalMiniBosses}
          hp={task.hp}
          stat={stat}
          maxHp={task.maxHp}
          leftMobs={mobsLeft}
          totalMobs={totalMobs}
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
                onClick={() => setActiveType('mob')}
                title="Mob"
                mod="wide"
              />
              <Button
                className={classNames('tasks-details__form-types-button', {
                  'is-active': activeType === 'miniBoss'
                })}
                type={"button"}
                onClick={() => setActiveType('miniBoss')}
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
    </HydrationTasks>
  )
}

export default TasksDetails