import './TasksDetails.scss'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useRef, useState} from "react";
import type {AppDispatch, RootState} from "../../../src/states/store";
import Button from "../../../src/components/Button/Button";
import TasksList from "../../../src/components/TasksList/TasksList";
import Field from "../../../src/components/Field/Field";
import {addMob} from "../../../src/states/boss/mobsSlice";
import {addMiniBoss} from "../../../src/states/boss/miniBossSlice";
import classNames from "classnames";

interface props {
  bossId: string
}

function TasksDetails(props: props) {

  const {bossId} = props

  const tasks = useSelector((state: RootState) => state.bosses.bosses)
  const miniBoss = useSelector((state: RootState) => state.miniBosses.miniBosses)
  const mobs = useSelector((state: RootState) => state.mobs.mobs)
  const dispatch: AppDispatch = useDispatch()
  const [textValue, setTextValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeType, setActiveType] = useState<'mob' | 'miniBoss'>('mob')

  const mobsArr = [...miniBoss].filter()

  const label =  `Add new ${activeType === 'mob' ? 'Mob' : 'Mini Boss'}`

  const {taskId} = useParams()

  const task = useMemo(() => {
    return tasks.find(t => t.id === taskId)
  }, [tasks, taskId])

  const handlerChange = (e: any) => {
    setTextValue(e.target.value)
  }

  const handleAddMob = (e: any) => {
    e.preventDefault()
    if (textValue.trim() !== '' && taskId) {

      if (activeType === 'mob') {
        dispatch(addMob({title: textValue, bossId: taskId}))
      } else {
        dispatch(addMiniBoss({title: textValue, bossId: taskId}))
      }

      setTextValue('')
      inputRef.current?.focus()
    }
  }


  return (
    <div
      className='tasks-details'
    >
      <div className="tasks-details__stats">
        <h1 className="tasks-details__title"> {task?.title}</h1>
      </div>
      <div className="tasks-details__body">
        <form
          className="tasks-details__form"
          onSubmit={handleAddMob}
        >
          <Field
            setText={handlerChange}
            textValue={textValue}
            inputRef={inputRef}
            label={label}
          />
          <div className="tasks-details__form-types">
            <Button
              className={classNames('tasks-details__form-types-button', {
                'is-active': activeType === 'mob'
              })}
              type={"button"}
              onClick={() => setActiveType('mob')}
              title="Mob"
            />
            <Button
              className={classNames('tasks-details__form-types-button', {
                'is-active': activeType === 'miniBoss'
              })}
              type={"button"}
              onClick={() => setActiveType('miniBoss')}
              title="Mini Boss"
            />

          </div>
          <Button
            type={"submit"}
            title="Add"
          />
        </form>

        <div className="tasks-details__list">
          <div className="tasks-details__list-mobs">
            <h3 className="tasks-details__list-title">Mobs</h3>
            <TasksList
              arrayToMap={[...mobs]}
              isMob
            />
          </div>

          <div className="tasks-details__list-mini-boss">
            <h3 className="tasks-details__list-title">Mini Bosses</h3>
            <TasksList
              arrayToMap={}
              isMiniBoss
            />
          </div>

        </div>
      </div>

    </div>
  )
}

export default TasksDetails