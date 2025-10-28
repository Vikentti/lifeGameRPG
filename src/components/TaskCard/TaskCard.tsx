import './TaskCard.scss'
import classNames from 'classnames'
import React from "react";
import Button from "../Button/Button";
import {damageBoss, removeBoss} from "../../states/boss/bossSlice";
import {removeMiniBoss} from "../../states/boss/miniBossSlice";
import {removeMob} from "../../states/boss/mobsSlice";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../states/store";
import HpBar from "../HpBar/HpBar";

interface TaskCardProps {
  className?: string
  title: string
  xp: number
  hp: number
  maxHp: number
  id: string
  isBoss?: boolean
  isMiniBoss?: boolean
}

const TaskCard: React.FC<TaskCardProps> = ({
                                             className,
                                             title,
                                             maxHp,
                                             xp,
                                             hp,
                                             id,
                                             isBoss,
                                             isMiniBoss
                                           }) => {

  const dispatch: AppDispatch = useDispatch()

  const mobs = useSelector((state: RootState) => state.mobs.mobs)
    const miniBosses = useSelector((state: RootState) => state.miniBosses.miniBosses)


  const handlerDelete = (id: string) => {

    if (isBoss) {
      dispatch(removeBoss(id))
    }
    if (isMiniBoss) {
      const miniBoss = [...miniBosses].find((item) => item.id === id)
      if (miniBoss) {
        dispatch(damageBoss({ id: miniBoss.bossId, damage: miniBoss.hp }))
        dispatch(removeMiniBoss(id))
      }

    } else {
      const mob = [...mobs].find((item) => item.id === id)
      if (mob) {
        dispatch(damageBoss({ id: mob.bossId, damage: mob.hp }))
        dispatch(removeMob(id))
      }
    }
  }


  const imageSrc =
    isBoss ? 'src/assets/icons/overlord-helm.svg' :
      isMiniBoss ? '/src/assets/icons/brutal-helm.svg' : '/src/assets/icons/horned-helm.svg'


  return (
    <div
      className={classNames(className, 'task-card')}
    >
      {!isBoss && <button
        className="task-card__delete-task-button"
        onClick={() => handlerDelete(id)}
      />}
      <img
        className="task-card__image"
        src={imageSrc}
        alt=""
        width="70"
        height="70"
        loading="lazy"
      />
      <div className="task-card__body">
        <h2 className="task-card__title">{title}</h2>
        <div className="task-card__stats">
          <p className="task-card__stats-text">Prize for completion:</p>
          <div className="task-card__stats-completion">
            <p className="task-card__stats-xp">{xp} XP</p>
            <p className="task-card__stats-har">5 INT</p>
          </div>
          <HpBar
            hp={hp}
            maxHp={maxHp}
          />
        </div>
      </div>
      {!isBoss && <Button
        className="task-card__complete-button"
        type={'button'}
        title="Complete"
        onClick={() => handlerDelete(id)}
      />}
    </div>
  )
}

export default TaskCard