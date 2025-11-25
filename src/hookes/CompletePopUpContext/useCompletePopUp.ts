import {useContext} from "react";
import {CompletePopUpContext} from "./CompletePopUpContext";

export const useCompletePopUp = () => {
  const context = useContext(CompletePopUpContext)
  if (!context) {
    throw new Error('useCompletePopUp must be used within a CompletePopUpProvider');
  }

  const setCompletePopUp = (stat: string, xp: number, title: string = 'Boss') => {
    context.setPopUpTitle(title)
    context.setXpGained(xp)
    context.setCharacteristic(stat)
    context.setActivePopUp(true)
  }


  return {setCompletePopUp, ...context}
}