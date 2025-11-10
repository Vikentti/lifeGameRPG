import './TimeWasted.scss'
import classNames from 'classnames'
import React from "react";

interface TimeWastedProps {
  className?: string
}

const TimeWasted = ({className}: TimeWastedProps) => {


  return (
    <div
      className={classNames(className, 'time-wasted')}
    >

    </div>
  )
}

export default TimeWasted