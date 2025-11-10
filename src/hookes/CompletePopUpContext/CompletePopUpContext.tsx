import {createContext} from "react";

interface CompletePopUpInterface {
  activePopUp: boolean;
  setActivePopUp: (value: boolean) => void;
  popUpTitle: string;
  setPopUpTitle: (title: string) => void;
  xpGained: number;
  setXpGained: (xp: number) => void;
  characteristic: string;
  setCharacteristic: (characteristic: string) => void;
}

export const CompletePopUpContext =createContext<any>(null)