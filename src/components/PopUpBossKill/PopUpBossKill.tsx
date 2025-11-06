import './PopUpBossKill.scss'
import classNames from 'classnames'
import React from "react";
import Button from "../Button/Button";
import {Link} from "react-router";

interface PopUpBossKillProps {
  className?: string
  isOpen: boolean
  toogle: () => void
}

const PopUpBossKill = ({className, isOpen, toogle}: PopUpBossKillProps) => {




  return (
    <>
      {isOpen && (
        <div
          className={classNames(className, 'pop-up-boss-kill')}
        >
          <div className="pop-up-boss-kill__body">
            <h1 className="pop-up-boss-kill__title">To kill Boss you need to kill at least <br/> one mob and one mini boss</h1>
            <p className="pop-up-boss-kill__text">If you have no mobs & mini bosses add them</p>
            <p className="pop-up-boss-kill__text-helper">To understand why this is necessary, go to the rules page</p>
          </div>

          <div className="pop-up-boss-kill__buttons">
            <Button
              type={"button"}
              onClick={toogle}
              title="Close Window"
            />
            <Link to="/rules" >
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