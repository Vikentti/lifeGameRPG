import './AllTasks.scss'
import TasksList from "../../components/TasksList/TasksList";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../states/store";
import {addBoss, removeAllBosses} from "../../states/boss/bossSlice";
import {useContext, useRef, useState} from "react";
import HydrationTasks from "../../components/HydrationTasks/HydrationTasks";
import Field from "../../components/Field/Field";
import Button from "../../components/Button/Button";
import CompletePopUp from "../../components/CompletePopUp/CompletePopUp";
import {
  CompletePopUpContext
} from "../../hookes/CompletePopUpContext/CompletePopUpContext";


function AllTasks() {


  const bosses = useSelector((state: RootState) => state.bosses.bosses)
  const dispatch: AppDispatch = useDispatch()
  const [textValue, setTextValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    activePopUp,
    popUpTitle,
    xpGained,
    characteristic,
  } = useContext(CompletePopUpContext)


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
          isColumns
        />
      </div>
      <CompletePopUp
        isActive={activePopUp}
        title={popUpTitle}
        xp={xpGained}
        stat={characteristic}
        isBig
      />
    </HydrationTasks>
  )
}

export default AllTasks