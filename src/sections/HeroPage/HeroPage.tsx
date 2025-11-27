import './HeroPage.scss'

import classNames from 'classnames'
import React from "react";

import CompleteStats from "../../components/CompleteStats/CompleteStats";
import HydrationTasks from "../../components/HydrationTasks/HydrationTasks";
import Welcome from "../../components/Welcome/Welcome";

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
          <CompleteStats />
        </div>
      </div>
    </HydrationTasks>
  )
}

export default HeroPage