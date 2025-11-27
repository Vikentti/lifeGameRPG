import './PopUpBossKill.scss'

import classNames from 'classnames'
import React, {useEffect, useRef} from "react";
import {Link} from "react-router";

import Button from "../Button/Button";

interface PopUpBossKillProps {
  className?: string
  isOpen: boolean
  toggle: () => void
}

const PopUpBossKill = ({className, isOpen, toggle}: PopUpBossKillProps) => {

  const popUpRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closePopUp = (event: MouseEvent) => {
      if (
        isOpen &&
        popUpRef.current &&
        !popUpRef.current.contains(event.target as Node)
      ) {
        toggle();
      }
    }
    document.addEventListener("mousedown", closePopUp)

    return () => {
      document.removeEventListener("mousedown", closePopUp)
    }
  }, [isOpen]);


  return (
    <>
      {isOpen && (
        <div
          className={classNames(className, 'pop-up-boss-kill')}
          ref={popUpRef}
        >
          <div className="pop-up-boss-kill__body">
            <h1 className="pop-up-boss-kill__title">To kill Boss you need to kill at least <br /> one mob and one mini boss
            </h1>
            <p className="pop-up-boss-kill__text">If you have no mobs & mini bosses add them</p>
            <p className="pop-up-boss-kill__text-helper">To understand why this is necessary, go to the rules page</p>
          </div>

          <div className="pop-up-boss-kill__buttons">
            <Button
              type={"button"}
              onClick={toggle}
              title="Close Window"
            />
            <Link to="/rules">
              <Button
                type={"button"}
                title="Go to rules"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default PopUpBossKill