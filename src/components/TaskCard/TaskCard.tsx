import './TaskCard.scss'
import classNames from 'classnames'
import React, {useContext, useState} from "react";
import Button from "../Button/Button";
import {addHp, damageBoss, removeBoss} from "../../states/boss/bossSlice";
import {removeMiniBoss} from "../../states/boss/miniBossSlice";
import {removeMob} from "../../states/boss/mobsSlice";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../states/store";
import HpBar from "../HpBar/HpBar";
import {addStat, addXp} from "../../states/User/userSlice";
import {
  CompletePopUpContext
} from "../../hookes/CompletePopUpContext/CompletePopUpContext";

interface TaskCardProps {
  className?: string
  title: string
  xp: number
  hp: number
  maxHp: number
  id: string
  isBoss?: boolean
  isMiniBoss?: boolean
  stat?: string
}

const TaskCard: React.FC<TaskCardProps> = ({
                                             className,
                                             title,
                                             maxHp,
                                             xp,
                                             stat,
                                             hp,
                                             id,
                                             isBoss,
                                             isMiniBoss
                                           }) => {


  const {
    setPopUpTitle,
    setXpGained,
    setActivePopUp,
    setCharacteristic,
  } = useContext(CompletePopUpContext)


  const dispatch: AppDispatch = useDispatch()

  const mobs = useSelector((state: RootState) => state.mobs.mobs)
  const miniBosses = useSelector((state: RootState) => state.miniBosses.miniBosses)

  const currentStatNumber = isBoss ? 10 : isMiniBoss ? 4 : 1

  const isStat = stat !== undefined && stat !== "undefined";


  const handlePopUpChange = (item: any) => {

    const Characteristic = item.stat !== 'undefined' ? item.stat : ''

    setXpGained(item.xp)
    setCharacteristic(Characteristic)
    setActivePopUp(true)
  }

  const handlerDelete = (id: string) => {
    if (isMiniBoss) {
      const miniBoss = [...miniBosses].find((item) => item.id === id)
      if (miniBoss) {
        dispatch(damageBoss({id: miniBoss.bossId, damage: miniBoss.hp}))
        dispatch(addStat({stat: miniBoss.stat, howMuch: 4}))
        dispatch(addXp(miniBoss.xp))
        setPopUpTitle("Mini Boss")
        handlePopUpChange(miniBoss)
        dispatch(removeMiniBoss({id: id}))
      }

    } else {
      const mob = [...mobs].find((item) => item.id === id)
      if (mob) {
        dispatch(damageBoss({id: mob.bossId, damage: mob.hp}))
        dispatch(addStat({stat: mob.stat, howMuch: 1}))
        dispatch(addXp(mob.xp))
        setPopUpTitle("Mob")
        handlePopUpChange(mob)
        dispatch(removeMob({id: id}))
      }
    }
  }

  const handlerSimpleDelete = (id: string) => {
    if (isBoss) {
      dispatch(removeBoss(id))
    }
    if (isMiniBoss) {
      const miniBoss = [...miniBosses].find((item) => item.id === id)
      if (miniBoss) {
        dispatch(addHp({id: miniBoss.bossId, upHp: miniBoss.hp}))
        dispatch(removeMiniBoss({
          id: id,
          noComplete: true,
          bossId: miniBoss.bossId
        }))
      }

    } else {
      const mob = [...mobs].find((item) => item.id === id)
      if (mob) {
        dispatch(addHp({id: mob.bossId, upHp: mob.hp}))
        dispatch(removeMob({id: id, noComplete: true, bossId: mob.bossId}))
      }
    }
  }


  const imageSrc =
    isBoss ? 'src/assets/icons/overlord-helm.svg' :
      isMiniBoss ? '/src/assets/icons/brutal-helm.svg' : '/src/assets/icons/horned-helm.svg'

  const statElement = stat ? (
    <p className="task-card__stats-stat">
      {stat} : {currentStatNumber}
    </p>
  ) : null;

  return (
    <div
      className={classNames(className, 'task-card')}
    >
      <button
        className="task-card__delete-task-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handlerSimpleDelete(id);
        }}
      />
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
            {isStat && (
              <p className="task-card__stats-stat">
                {stat} : {currentStatNumber}
              </p>
            )}
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