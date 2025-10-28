import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {mob} from "../../types/bossTypes";
import {nanoid} from "nanoid";

interface mobState {
  mobs: mob[]
}

const loadFromLocalStorage = (): mob[] => {
  try {
    const data = localStorage.getItem('mobs')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const initialState: mobState = {
  mobs: loadFromLocalStorage()
}

const mobsSlice = createSlice({
  name: "mobs",
  initialState,
  reducers: {
    addMob: (state, action: PayloadAction<{title: string, bossId: string, hp : number}>) => {
      const newMob = {
        ...action.payload,
        id: nanoid(),
        xp: action.payload.hp,
        maxHp: action.payload.hp,
      }
      state.mobs.push(newMob)
      localStorage.setItem("mobs", JSON.stringify(state.mobs))
    },
    removeMob: (state, action: PayloadAction<string>) => {
      state.mobs = state.mobs.filter((item) => item.id !== action.payload)

      localStorage.setItem('mobs', JSON.stringify(state.mobs))
    }
  }

})
export const {addMob, removeMob} = mobsSlice.actions
export default mobsSlice.reducer