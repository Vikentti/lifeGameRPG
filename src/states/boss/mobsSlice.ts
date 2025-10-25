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
    addMob: (state, action: PayloadAction<{title: string, bossId: string}>) => {
      const health = Math.floor(Math.random() * (50 - 20) + 20)
      const newMob = {
        ...action.payload,
        id: nanoid(),
        hp: health,
        xp: health,
        maxHp: health,
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