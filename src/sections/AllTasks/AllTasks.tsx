import './AllTasks.scss'
import classNames from 'classnames'
import {Link} from "react-router";
import TasksList from "../../components/TasksList/TasksList";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../states/store";
import {addBoss, removeAllBosses} from "../../states/boss/bossSlice";
import {useRef, useState} from "react";
import {nanoid} from "nanoid";
import HydrationTasks from "../../components/HydrationTasks/HydrationTasks";
import Field from "../../components/Field/Field";
import Button from "../../components/Button/Button";


function AllTasks() {


  const bosses = useSelector((state: RootState) => state.bosses.bosses)
  const dispatch = useDispatch()
  const [textValue, setTextValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)


  const handlerSubmit = (e: any) => {
    e.preventDefault()

    if (textValue.trim() !== '') {
      dispatch(addBoss({title: textValue}))
      setTextValue('')
      inputRef.current?.focus()
    }
  }

  const handlerChange = (e: any) => {
    setTextValue(e.target.value)
  }

  // console.log(bosses)


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
          arrayToMap={[...bosses]}
          isBoss
        />
      </div>
    </HydrationTasks>
  )
}

export default AllTasks