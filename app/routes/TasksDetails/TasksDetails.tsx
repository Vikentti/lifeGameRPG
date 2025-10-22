import './TasksDetails.scss'
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import type {RootState} from "../../../src/states/store";
import Button from "../../../src/components/Button/Button";


function TasksDetails() {

  const tasks = useSelector((state: RootState) => state.bosses.bosses)

  // const [task, setTask] = useState({})

  const {taskId} = useParams()

  const task = useMemo(() => {
    return tasks.find(t => t.id === taskId)
  }, [tasks, taskId])



  // useEffect(() => {
  //   const data = localStorage.getItem('task')
  //   const localTask = data ? JSON.parse(data) : {}
  //   const reduxTask = tasks.find(t => t.id === taskId)
  //   const selectedTask = reduxTask || localTask
  //   setTask(selectedTask)
  //   localStorage.setItem('task', JSON.stringify(selectedTask))
  // }, [taskId, tasks]);

  // console.log(task)

  return (
    <div
      className='tasks-details'
    >
      <h1>task title</h1>
      <h1> {task?.title}</h1>
    </div>
  )
}

export default TasksDetails