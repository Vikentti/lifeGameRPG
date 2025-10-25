import './TasksList.scss'
import classNames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../states/store";
import {damageBoss, removeBoss} from "../../states/boss/bossSlice"
import type {Boss, miniBoss, mob} from "../../types/bossTypes";
import {Link} from "react-router";
import Button from "../Button/Button";
import {addXp} from "../../states/User/userSlice";
import {removeMiniBoss} from "../../states/boss/miniBossSlice";
import {removeMob} from "../../states/boss/mobsSlice";


type EntityArray = Boss[] | miniBoss[] | mob[]


interface TaskListProps {
  className?: string,
  arrayToMap?: EntityArray,
  isBoss?: boolean,
  isMob?: boolean,
  isMiniBoss?: boolean,
  isColumns?: boolean,
}

function TasksList(props: TaskListProps) {
  const {
    className,
    arrayToMap,
    isBoss,
    isMob,
    isMiniBoss,
    isColumns,
  } = props

  const dispatch :AppDispatch = useDispatch()

  const boss = useSelector((state: RootState) => state.bosses.bosses)

  const handlerDelete = (id: string) => {
    if (isBoss) {
      dispatch(removeBoss(id))
    }
    if (isMiniBoss) {
      dispatch(removeMiniBoss(id))
    }
    if (isMob) {
      dispatch(removeMob(id))
    }
  }

  const damage = 100

  const handleHit = (id: string, damage: number) => {
    dispatch((damageBoss({id, damage})))
    dispatch(addXp(damage))
    const hp = boss.find((item) => item.id === id)

    if (hp) {
      if (damage > hp.hp) {
        dispatch(removeBoss(id))
      }
    }
  }




  return (
    <ul
      className={classNames(className, 'tasks-list', {
        'tasks-list--columns': isColumns,
      })}
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
            >Title:{title}, {id}</Link>
            : <p className="tasks__item">Title:{title}, {id}</p>}

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