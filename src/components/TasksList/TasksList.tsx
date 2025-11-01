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
import TaskCard from "../TaskCard/TaskCard";


type EntityArray = Boss[] | miniBoss[] | mob[]


interface TaskListProps {
  className?: string,
  arrayToMap?: EntityArray,
  isBoss?: boolean,
  isMiniBoss?: boolean,
  isColumns?: boolean,
}

const TasksList = ({
                     className,
                     arrayToMap,
                     isBoss,
                     isMiniBoss,
                     isColumns
                   } : TaskListProps) => {


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
            >
              <TaskCard
                title={title}
                xp={xp}
                hp={hp}
                maxHp={maxHp}
                id={id}
                isBoss
              />
            </Link>
            : <TaskCard
              title={title}
              xp={xp}
              hp={hp}
              maxHp={maxHp}
              id={id}
              isMiniBoss={isMiniBoss}
            />}
        </li>
      ))}
    </ul>
  )
}

export default TasksList