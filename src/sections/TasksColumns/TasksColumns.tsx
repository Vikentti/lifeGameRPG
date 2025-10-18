import './TasksColumns.scss'
import classNames from 'classnames'
import {Link} from "react-router";
import TasksList from "../../components/TasksList/TasksList";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../states/store";
import {addBoss, removeAllBosses} from "../../states/boss/bossSlice";
import {useState} from "react";
import {nanoid} from "nanoid";
import HydrationTasks from "../../components/HydrationTasks/HydrationTasks";

function TasksColumns(props : any) {
  const {
    className,
  } = props

  const bosses = useSelector((state: RootState) => state.bosses)
  const dispatch = useDispatch()
  const [textValue, setTextValue] = useState("")


  const handlerSubmit = (e : any) => {
    e.preventDefault()

    if (textValue.trim() !== '') {
      dispatch(addBoss({title: textValue}))
      setTextValue('')
    }
  }


  return (
    <HydrationTasks>
      <div
        className={classNames(className, 'tasks-columns')}
      >
        <Link to="/">Home</Link>

        <form onSubmit={handlerSubmit}>
          <p>
            <label
              className="addBoss__label"
              htmlFor="name"
            >Title of boss
            </label>
            <input
              className="addBoss__input"
              id="name"
              name="name"
              onChange={(e) => {setTextValue(e.target.value)}}
              value={textValue}
            />
          </p>
          <button
            type="submit"
          >
            add boss
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
        />
      </div>
    </HydrationTasks>
  )
}

export default TasksColumns