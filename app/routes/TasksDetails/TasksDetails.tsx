import './TasksDetails.scss'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useRef, useState} from "react";
import type {AppDispatch, RootState} from "../../../src/states/store";
import Button from "../../../src/components/Button/Button";
import TasksList from "../../../src/components/TasksList/TasksList";
import Field from "../../../src/components/Field/Field";
import {addMob} from "../../../src/states/boss/mobsSlice";

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


  const {taskId}  = useParams()

  const task = useMemo(() => {
    return tasks.find(t => t.id === taskId)
  }, [tasks, taskId])

  const handlerChange = (e: any) => {
    setTextValue(e.target.value)
  }

  const handleAddMob = (e : any) => {
    e.preventDefault()
    if (textValue.trim() !== '') {
      if (taskId) {
        dispatch(addMob({title: textValue, bossId: taskId}))
        setTextValue('')
        inputRef.current?.focus()
      }
    }
  }


  return (
    <div
      className='tasks-details'
    >
      <div className="tasks-details__stats">
        <h1 className="tasks-details__title"> {task?.title}, {taskId}</h1>
      </div>
      <div className="tasks-details__body">
        <form onSubmit={handleAddMob}>
          <Field
            setText={handlerChange}
            textValue={textValue}
            inputRef={inputRef}
          />
          <Button
            type={"submit"}
            title="Add mob"
          />
        </form>
        <TasksList
          arrayToMap={[...mobs]}
          isMob
        />

        <TasksList
          arrayToMap={[...miniBoss]}
          isMiniBoss
        />
      </div>

    </div>
  )
}

export default TasksDetails