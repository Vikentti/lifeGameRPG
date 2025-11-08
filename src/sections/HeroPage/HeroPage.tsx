import './HeroPage.scss'
import classNames from 'classnames'
import React from "react";
import Welcome from "../../components/Welcome/Welcome";

interface HeroPageProps {
  className?: string
}

const HeroPage = ({className}: HeroPageProps) => {


  return (
    <div
      className={classNames(className, 'hero')}
    >
      <Welcome />
    </div>
  )
}

export default HeroPage