import './BossCard.scss'
import React from "react";
import HpBar from "../HpBar/HpBar";

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
                  }: BossCardProps) => {


  return (
    <div className="boss-card">
      <div className="boss-card__head">
        <img
          className="boss-card-image"
          src="/src/assets/icons/overlord-helm.svg"
          width="80"
          height="80"
          loading="lazy"
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
          <div className="test">{stat}</div>
        </div>
        <HpBar
          hp={hp}
          maxHp={maxHp}
        />
      </div>
    </div>
  )
}

export default BossCard