import './TasksList.scss'
import classNames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../states/store";
import {makeHit, removeBoss} from "../../states/boss/bossSlice"
import type {Boss} from "../../types/bossTypes";
import {Link} from "react-router";
import Button from "../Button/Button";


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

  const boss = useSelector((state: RootState) => state.bosses.bosses)

  const handlerDelete = (id: string) => {
    dispatch(removeBoss(id))
  }

  const damage = 100

  const handleHit = (id: string, damage: number) => {
    dispatch((makeHit({id, damage})))
  }




  return (
    <ul
      className={classNames(className, 'tasks-list')}
    >
      {arrayToMap && arrayToMap.map(({title, id, xp, hp}) => (
        <li
          className="tasks-item"
          key={id}
        >
          {isBoss
            ? <Link
              to={`/task/${id}`}
              className="tasks__link"
            >Title:{title}, HP: {hp}, XP: {xp}</Link>
            : <p className="tasks__item">Title:{title}, HP: {hp}, XP: {xp}</p>}

          <Button
            type={"button"}
            onClick={() => handlerDelete(id)}
            title="Delete"
          />

          <Button
            type={"button"}
            onClick={() => handleHit(id, damage)}
            title="hit on 100"
          />
        </li>
      ))}
    </ul>
  )
}

export default TasksList