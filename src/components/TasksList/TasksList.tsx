import './TasksList.scss'
import classNames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../states/store";
import {removeBoss} from "../../states/boss/bossSlice"
import type {Boss} from "../../types/bossTypes";
import {Link} from "react-router";


interface TaskListProps {
  className?: string,
  arrayToMap?: Boss[],
  isBoss?: boolean,
}

function TasksList(props: TaskListProps) {
  const {
    className,
    arrayToMap,
    isBoss,
  } = props

  const dispatch = useDispatch()

  const handlerDelete = (id: string) => {
    dispatch(removeBoss(id))
  }


  return (
    <ul
      className={classNames(className, 'tasks-list')}
    >
      {arrayToMap && arrayToMap.map(({title, id}) => (
        <li
          className="tasks-item"
          key={id}
        >
          {isBoss
            ? <Link
              to={`/task/${id}`}
              className="tasks__link"
            >{title}</Link>
            : <p className="tasks__item">{title}</p>}

          <button
            onClick={() => handlerDelete(id)}
            type="button"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksList