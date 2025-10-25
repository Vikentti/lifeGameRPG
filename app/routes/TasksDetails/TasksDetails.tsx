import './TasksDetails.scss'
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import type {RootState} from "../../../src/states/store";
import Button from "../../../src/components/Button/Button";
import TasksList from "../../../src/components/TasksList/TasksList";

interface props {
  bossId: string
}

function TasksDetails(props: props) {

  const {bossId} = props

  const tasks = useSelector((state: RootState) => state.bosses.bosses)
  const miniBoss = useSelector((state: RootState)=> state.miniBosses.miniBosses)
  const mobs = useSelector((state: RootState)=> state.mobs.mobs)


  const {taskId} = useParams()

  const task = useMemo(() => {
    return tasks.find(t => t.id === taskId)
  }, [tasks, taskId])


  return (
    <div
      className='tasks-details'
    >
      <div className="tasks-details__stats">
        <h1 className="tasks-details__title"> {task?.title}, {taskId}</h1>
      </div>
      <div className="tasks-details__body">
        <TasksList
        arrayToMap={[...mobs]}
        />
        <Button type={"button"} onClick={}/>
        <TasksList
        arrayToMap={[...miniBoss]}
        />
        <Button type={"button"} onClick={}/>
      </div>

    </div>
  )
}

export default TasksDetails