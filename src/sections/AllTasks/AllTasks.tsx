import './AllTasks.scss'

import React, {memo, useCallback, useMemo, useRef, useState} from "react";
import {useDispatch,} from "react-redux";

import Button from "../../components/Button/Button";
import Field from "../../components/Field/Field";
import HydrationTasks from "../../components/HydrationTasks/HydrationTasks";
import TasksList from "../../components/TasksList/TasksList";
import {useBosses,} from "../../hookes/useEnemies";
import {addBoss, removeAllBosses} from "../../states/boss/bossSlice";
import type {AppDispatch,} from "../../states/store";



function AllTasks() {


  const bosses = useBosses()
  const dispatch: AppDispatch = useDispatch()
  const [textValue, setTextValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const bossArray = useMemo(() => [...bosses.bosses], [[bosses.bosses]])

  const handlerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
  }, [])

  const handlerSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    if (textValue.trim() !== '') {
      dispatch(addBoss({title: textValue}))
      setTextValue('')
      inputRef.current?.focus()
    }
  }, [textValue, dispatch])




  return (
    <HydrationTasks>
      <div
        className='all-tasks'
      >
        <form
          className="all-tasks__form"
          onSubmit={handlerSubmit}
        >
          <Field
            setText={handlerChange}
            textValue={textValue}
            inputRef={inputRef}
          />
          <Button
            type={"submit"}
            title="Add Boss"
          />
        </form>

        <Button
          type={"button"}
          onClick={() => dispatch(removeAllBosses())}
          title="Delete all "
        />
        <TasksList
          arrayToMap={bossArray}
          isBoss
          isColumns
        />
      </div>
    </HydrationTasks>
  )
}

export default memo(AllTasks)