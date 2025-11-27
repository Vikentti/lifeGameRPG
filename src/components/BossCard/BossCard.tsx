import './BossCard.scss'

import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router";

import {
  useCompletePopUp
} from "../../hookes/CompletePopUpContext/useCompletePopUp";
import {removeBoss} from "../../states/boss/bossSlice";
import type {AppDispatch} from "../../states/store";
import {onKill} from "../../states/User/userSlice";
import type {Boss} from "../../types/bossTypes";
import Button from "../Button/Button";
import HpBar from "../HpBar/HpBar";
import PopUpBossKill from "../PopUpBossKill/PopUpBossKill";

interface BossCardProps {
  className?: string
  title: string
  leftMini: number
  totalMini: number
  hp: number
  stat?: string,
  maxHp: number
  leftMobs: number
  totalMobs: number
  boss: Boss
}

const BossCard = ({
                    title,
                    leftMini,
                    totalMini,
                    hp,
                    maxHp,
                    stat,
                    leftMobs,
                    totalMobs,
                    boss,
                  }: BossCardProps) => {

  const dispatch: AppDispatch = useDispatch()

  const canKill = (leftMobs === 0 && leftMini === 0 && totalMobs > 0 && totalMini > 0)

  const [isOpen, setIsOpen] = useState(false)

  const {setCompletePopUp} = useCompletePopUp()


  const handleKill = () => {
    if (canKill) {
      dispatch(onKill({stat: boss.stat, howMuch: 10, xp: boss.xp}))
      setCompletePopUp(boss.stat, boss.xp)
      dispatch(removeBoss(boss.id))
    } else {
      setIsOpen(true)
    }
  }

  const handelOpen = () => {
    setIsOpen(!isOpen)
  }


  return (
    <div className="boss-card">
      <div className="boss-card__head">
        <img
          className="boss-card-image"
          src="/src/assets/icons/overlord-helm.svg"
          width="80"
          height="80"
          loading="lazy"
          alt={title}
        />
        <h1 className="boss-card__title"> {title}</h1>
      </div>
      <div className="boss-card__body">
        <div className="boss-card__info">
          <div className="boss-card__mob">
            <img
              className="boss-card__mob-image"
              src="/src/assets/icons/horned-helm.svg"
              alt=""
              width="50"
              height="50"
              loading="lazy"
            />
            <p className="boss-card__mob-number">{leftMobs}/{totalMobs}</p>
          </div>
          <div className="boss-card__miniboss">
            <img
              className="boss-card__miniboss-image"
              src="/src/assets/icons/brutal-helm.svg"
              alt=""
              width="50"
              height="50"
              loading="lazy"
            />
            <p className="boss-card__miniboss-number">{leftMini}/{totalMini}</p>
          </div>
          {stat !== 'undefined' &&
            <div className="boss-card__stat">{stat}</div>}
        </div>
        <HpBar
          hp={hp}
          maxHp={maxHp}
        />

        {canKill && (<Link
          to='/allTasks'
          className="boss-card__delete-button"
        >
          <Button
            type={"button"}
            onClick={handleKill}
            title="Kill Boss"
            mod="kill"
          />
        </Link>)}

        {!canKill && (
          <Button
            type={"button"}
            onClick={handleKill}
            title="Kill Boss"
            mod="kill"
          />
        )}

      </div>
      <PopUpBossKill
        isOpen={isOpen}
        toggle={handelOpen}
      />
    </div>
  )
}

export default BossCard