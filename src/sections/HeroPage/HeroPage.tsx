import './HeroPage.scss'
import classNames from 'classnames'
import React from "react";
import Welcome from "../../components/Welcome/Welcome";
import TimeWasted from "../../components/TimeWasted/TimeWasted";
import CompleteStats from "../../components/CompleteStats/CompleteStats";
import HydrationTasks from "../../components/HydrationTasks/HydrationTasks";

interface HeroPageProps {
  className?: string
}

const HeroPage = ({className}: HeroPageProps) => {




  return (
    <HydrationTasks>
      <div
        className={classNames(className, 'hero')}
      >
        <Welcome />
        <div className="hero__body">
          <TimeWasted />
          <CompleteStats />
        </div>
      </div>
    </HydrationTasks>
  )
}

export default HeroPage