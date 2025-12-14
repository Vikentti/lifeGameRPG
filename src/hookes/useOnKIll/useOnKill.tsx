import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../states/store";
import {useCompletePopUp} from "../CompletePopUpContext/useCompletePopUp";
import {onKill} from "../../states/User/userSlice";
import {useCallback} from "react";

interface KillParams {
  stat: string
  howMuch: number
  xp: number
  type: string
  isBig?: boolean
}

const useOnKill = () => {
  const dispatch: AppDispatch = useDispatch()

  const {setCompletePopUp} = useCompletePopUp()

  const killWithPopUo = useCallback((params: KillParams, additionalCallback?: () => void) => {

    const {stat, howMuch, xp, type, isBig = false} = params

    dispatch(onKill({stat: stat, howMuch: howMuch, xp: xp}))
    setCompletePopUp(stat, xp, howMuch, type, isBig)

    if (additionalCallback) {
      additionalCallback()
    }
  }, [dispatch, setCompletePopUp])

  return killWithPopUo

}

export default useOnKill