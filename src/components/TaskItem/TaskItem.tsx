import './TaskItem.scss'
import classNames from 'classnames'
import {Link} from "react-router";
import {useDispatch} from "react-redux";
import {removeBoss} from "../../states/boss/bossSlice";

interface props {
  className?: string
  isBoss?: boolean
  title?: string
  id?: string
}

function TaskItem(props : props) {
  const {
    className,
    isBoss = false,
    id,
    title,
  } = props

  const dispatch = useDispatch()

  const handlerDelete = (id: string | undefined) => {
    if (id != null) {
      dispatch(removeBoss(id))
    }
  }

  return (
    <div
      className={classNames(className, 'task')}
    >
      {isBoss
        ? <Link
          to={`/task/${id}`}
          className="task__link"
        >{title}</Link>
        : <p className="task__title">{title}</p>
      }

      <button
        className="task__button button"
        onClick={() => handlerDelete(id)}
        type="button"
      >
        delete
      </button>
    </div>
  )
}

export default TaskItem