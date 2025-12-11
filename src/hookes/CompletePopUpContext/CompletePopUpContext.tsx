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
  howMuchGained: number;
  setHwoMuchGained: (howMuch: number) => void
  isBigPopUp: boolean,
  setIsBigPopUp: (isBigPopUp: boolean) => void
}

export const CompletePopUpContext =createContext<CompletePopUpInterface | null>(null)