import './TasksDetails.scss'
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import type {RootState} from "../../../src/states/store";
import Button from "../../../src/components/Button/Button";
import TasksList from "../../../src/components/TasksList/TasksList";


function TasksDetails() {

  const tasks = useSelector((state: RootState) => state.bosses.bosses)


  const {taskId} = useParams()

  const task = useMemo(() => {
    return tasks.find(t => t.id === taskId)
  }, [tasks, taskId])

  const arr1 = [
    {title: 'task', hp: 1, bossId: 'fuck', maxHp: 30, xp: 5, id: "asdadcxvc234151g"},


  ]



  return (
    <div
      className='tasks-details'
    >
      <div className="tasks-details__stats">
        <h1 className="tasks-details__title"> {task?.title}</h1>
      </div>
      <div className="tasks-details__body">
        <TasksList arrayToMap={arr1}/>
      </div>

    </div>
  )
}

export default TasksDetails