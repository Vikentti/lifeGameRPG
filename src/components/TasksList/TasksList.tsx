import './TasksList.scss'
import classNames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../states/store";
import {removeBoss} from "../../states/boss/bossSlice"

function TasksList(props : any) {
  const {
    className,
    arrayToMap
  } = props

  const dispatch = useDispatch()

  const handlerDelete = (id : string) => {
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
          <p className="title">Boss title: {title}</p>
          <p className="id">Boss id: {id}</p>
          <button
            onClick={() => handlerDelete(id)}
            type="button"
          >
            remove
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksList