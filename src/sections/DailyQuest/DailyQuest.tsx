import './DailyQuest.scss'

import classNames from 'classnames'
import React from "react";

interface DailyQuestProps {
  className?: string
}

const DailyQuest = ({className}: DailyQuestProps) => {


  return (
    <div
      className={classNames(className, 'daily-quest')}
    >

    </div>
  )
}

export default DailyQuest