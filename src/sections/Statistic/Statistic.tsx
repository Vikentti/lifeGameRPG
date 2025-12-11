import './Statistic.scss'
import classNames from 'classnames'
import React from "react";

interface StatisticProps {
  className?: string
}

const Statistic = ({className}: StatisticProps) => {


  return (
    <div
      className={classNames(className, 'statistic')}
    >
      Statistic
    </div>
  )
}

export default Statistic