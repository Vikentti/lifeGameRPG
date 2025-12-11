import {useContext} from "react";

import {CompletePopUpContext} from "./CompletePopUpContext";

export const useCompletePopUp = () => {
  const context = useContext(CompletePopUpContext)
  if (!context) {
    throw new Error('useCompletePopUp must be used within a CompletePopUpProvider');
  }

  const setCompletePopUp = (stat: string, xp: number, howMuch: number, title: string = 'Boss', isBigPopUP: boolean, ) => {
    context.setPopUpTitle(title)
    context.setXpGained(xp)
    context.setCharacteristic(stat)
    context.setIsBigPopUp(isBigPopUP)
    context.setActivePopUp(true)
    context.setHwoMuchGained(howMuch)
  }


  return {setCompletePopUp, ...context}
}