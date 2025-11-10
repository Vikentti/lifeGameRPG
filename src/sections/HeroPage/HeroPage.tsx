import './HeroPage.scss'
import classNames from 'classnames'
import React from "react";
import Welcome from "../../components/Welcome/Welcome";
import TimeWasted from "../../components/TimeWasted/TimeWasted";
import CompleteStats from "../../components/CompleteStats/CompleteStats";

interface HeroPageProps {
  className?: string
}

const HeroPage = ({className}: HeroPageProps) => {




  return (
    <div
      className={classNames(className, 'hero')}
    >
      <Welcome />
      <div className="hero__body">
        <TimeWasted />
        <CompleteStats />
      </div>
    </div>
  )
}

export default HeroPage