import './CompleteStats.scss'

import classNames from 'classnames'
import React from "react";

import {useEnemies} from "../../hookes/useEnemies";

interface CompleteStatsProps {
  className?: string
}

const CompleteStats = ({className}: CompleteStatsProps) => {

  const {bosses, miniBosses, mobs} = useEnemies()

  const bossesCompleted = Object.keys(bosses.totalBosses).length - bosses.bosses.length

  const miniBossesCompleted = Object.keys(miniBosses.totalMiniBosses).length - miniBosses.miniBosses.length

  const mobsCompleted = Object.keys(mobs.totalMobs).length - mobs.mobs.length


  const completeGetStat = () => [
    {title: 'Bosses', completed: bossesCompleted},
    {title: 'Mini Bosses', completed: miniBossesCompleted},
    {title: 'Mobs', completed: mobsCompleted},
  ]

  const completeArr = completeGetStat()


  return (
    <div
      className={classNames(className, 'complete-stats')}
    >
      <h2 className="complete-stats__title">Completed task</h2>
      <ul className="complete-stats__list">
        {completeArr.map(({title, completed}, index) => (
          <li
            className="complete-stats__item"
            key={index}
          >
            <div className="complete-stats__item-name">{title}</div>
            <div className="complete-stats__item-number">{completed}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CompleteStats