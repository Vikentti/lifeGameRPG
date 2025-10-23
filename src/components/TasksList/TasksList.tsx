import './TasksList.scss'
import classNames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../states/store";
import {makeHit, removeBoss} from "../../states/boss/bossSlice"
import type {Boss, miniBoss, mob} from "../../types/bossTypes";
import {Link} from "react-router";
import Button from "../Button/Button";


type EntityArray = Boss[] | miniBoss[] | mob[]


interface TaskListProps {
  className?: string,
  arrayToMap?: EntityArray,
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

    const hp = boss.find((item) => item.id === id)

    if (hp) {
      if (damage > hp.hp) {
        dispatch(removeBoss(id))
      }
    }
  }




  return (
    <ul
      className={classNames(className, 'tasks-list')}
    >
      {arrayToMap && arrayToMap.map(({title, id, xp, hp, maxHp}) => (
        <li
          className="tasks-item"
          key={id}
        >
          {isBoss
            ? <Link
              to={`/task/${id}`}
              className="tasks__link"
            >Title:{title}, {maxHp} / {hp}, </Link>
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