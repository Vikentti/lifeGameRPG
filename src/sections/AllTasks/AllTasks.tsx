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


function AllTasks() {


  const bosses = useSelector((state: RootState) => state.bosses)
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


  return (
    <HydrationTasks>
      <div
        className='all-tasks'
      >
       <div className="all-tasks__inner">
         <form
           className="all-tasks__form"
           onSubmit={handlerSubmit}
         >
           <div className="all-tasks__actions">
             <label
               className="all-tasks__label"
               htmlFor="name"
             >Title of boss
             </label>
             <input
               className="all-tasks__input"
               id="name"
               name="name"
               onChange={(e) => {
                 setTextValue(e.target.value)
               }}
               value={textValue}
               ref={inputRef}
             />
           </div>
           <button
             type="submit"
             className="all-tasks__button"
           >
             Add boss
           </button>
         </form>
          <button
          onClick={() => dispatch(removeAllBosses())}
          type="button"
        >
          remove all
        </button>
         <TasksList
          arrayToMap={[...bosses.bosses]}
          isBoss
        />
       </div>
      </div>
    </HydrationTasks>
  )
}

export default AllTasks