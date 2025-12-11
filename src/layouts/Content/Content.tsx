import './Content.scss'

import React, {useState} from "react";
import CompletePopUp from "../../components/CompletePopUp/CompletePopUp";
import {
  useCompletePopUp
} from "../../hookes/CompletePopUpContext/useCompletePopUp";

function Content({children} : {children : React.ReactNode}) {

  const {
    activePopUp,
    popUpTitle,
    xpGained,
    characteristic,
    howMuchGained,
    isBigPopUp,
  } = useCompletePopUp()

  return (
    <main
      className="container"
    >
      {children}
      <CompletePopUp
        isActive={activePopUp}
        title={popUpTitle}
        xp={xpGained}
        stat={characteristic}
        howMuch={howMuchGained}
        isBigPopUp={isBigPopUp}
      />
    </main>
  )
}

export default Content