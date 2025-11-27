import './TaskCard.scss'

import classNames from 'classnames'
import React, {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
  CompletePopUpContext
} from "../../hookes/CompletePopUpContext/CompletePopUpContext";
import {useEnemies} from "../../hookes/useEnemies";
import {addHp, damageBoss, removeBoss} from "../../states/boss/bossSlice";
import {removeMiniBoss} from "../../states/boss/miniBossSlice";
import {removeMob} from "../../states/boss/mobsSlice";
import type {AppDispatch, RootState} from "../../states/store";
import {addStat, addXp, onKill} from "../../states/User/userSlice";
import Button from "../Button/Button";
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

  const {mobs, miniBosses} = useEnemies()


  const currentStatNumber = isBoss ? 10 : isMiniBoss ? 4 : 1

  const isStat = stat !== undefined && stat !== "undefined";

  const handlePopUpChange = (item: any) => {
    const Characteristic = item.stat !== 'undefined' ? item.stat : ''
    setXpGained(item.xp)
    setCharacteristic(Characteristic)
    setActivePopUp(true)
  }

  const handlerDelete = (id: string) => {
    const target = isMiniBoss
      ? [...miniBosses.miniBosses].find((item) => item.id === id)
      : [...mobs.mobs].find((item) => item.id === id)

    if (!target) {
      return
    }

    const data = isMiniBoss
      ? {popUpTitle: "Mini Boss", remove: removeMiniBoss, howMuch: 4}
      : {popUpTitle: "Mob", remove: removeMob, howMuch: 1}

    dispatch(damageBoss({id: target.bossId, damage: target.hp}))
    dispatch(onKill({stat: target.stat, howMuch: 4, xp: target.xp}))
    setPopUpTitle(data.popUpTitle)
    handlePopUpChange(target)
    dispatch(data.remove({id}))
  }

  const handlerSimpleDelete = (id: string) => {
    if (isBoss) {
      dispatch(removeBoss(id))

    } else {
      const target = isMiniBoss
        ? miniBosses.miniBosses.find(item => item.id === id)
        : mobs.mobs.find(item => item.id === id);

      if (!target) {return}

      dispatch(addHp({id: target.bossId, upHp: target.hp}))

      const targetDelete = isMiniBoss ? removeMiniBoss : removeMob

      dispatch(targetDelete({id: id, noComplete: true, bossId: target.bossId}))
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