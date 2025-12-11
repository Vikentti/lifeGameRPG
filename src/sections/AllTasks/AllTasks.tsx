import './AllTasks.scss'

import React, {useRef, useState} from "react";
import {useDispatch,} from "react-redux";

import Button from "../../components/Button/Button";
import CompletePopUp from "../../components/CompletePopUp/CompletePopUp";
import Field from "../../components/Field/Field";
import HydrationTasks from "../../components/HydrationTasks/HydrationTasks";
import TasksList from "../../components/TasksList/TasksList";
import {useBosses,} from "../../hookes/useEnemies";
import {addBoss, removeAllBosses} from "../../states/boss/bossSlice";
import type {AppDispatch,} from "../../states/store";
import {
  useCompletePopUp
} from "../../hookes/CompletePopUpContext/useCompletePopUp";


function AllTasks() {


  const bosses = useBosses()
  const dispatch: AppDispatch = useDispatch()
  const [textValue, setTextValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    activePopUp,
    popUpTitle,
    xpGained,
    characteristic,
    howMuchGained,
  } = useCompletePopUp()


  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (textValue.trim() !== '') {
      dispatch(addBoss({title: textValue}))
      setTextValue('')
      inputRef.current?.focus()
    }
  }

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
  }


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
          arrayToMap={[...bosses.bosses]}
          isBoss
          isColumns
        />
      </div>
      {/*<CompletePopUp*/}
      {/*  isActive={true}*/}
      {/*  title={popUpTitle}*/}
      {/*  xp={xpGained}*/}
      {/*  stat={characteristic}*/}
      {/*  howMuch={howMuchGained}*/}
      {/*  isBig*/}
      {/*/>*/}
    </HydrationTasks>
  )
}

export default AllTasks