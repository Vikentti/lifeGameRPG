import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";

import type {mob} from "../../types/bossTypes";
import type {RootState} from "../store";
import checkTask from "./StatsArr/Statistic";

interface mobState {
  mobs: mob[]
  totalMobs: Record<string, number>
}

const loadFromLocalStorage = (): mobState => {

  if (typeof window === 'undefined') {
    return {mobs: [], totalMobs: {}}
  }

  try {
    const data = localStorage.getItem('mobs')
    if (data) {
      const parse = JSON.parse(data)

      if (Array.isArray(parse)) {
        return {
          mobs: parse,
          totalMobs: parse.reduce((acc, boss) => {
            acc[boss.bossId] = (acc[boss.bossId] || 0) + 1
          }, {})
        }
      }
      return parse
    }
    return {mobs: [], totalMobs: {}}
  } catch {
    return {mobs: [], totalMobs: {}}
  }
}

const initialState: mobState = loadFromLocalStorage()

const mobsSlice = createSlice({
  name: "mobs",
  initialState,
  reducers: {
    addMob: (state, action: PayloadAction<{
      title: string,
      bossId: string,
      hp: number,
      stat: string
    }>) => {
      const newMob = {
        ...action.payload,
        id: nanoid(),
        xp: 10,
        maxHp: action.payload.hp,
      }
      state.mobs.push(newMob)
      state.totalMobs[action.payload.bossId] =
        (state.totalMobs[action.payload.bossId] || 0) + 1

    },
    removeMob: (state, action: PayloadAction<{
      id: string,
      noComplete?: boolean,
      bossId?: string,
    }>) => {
      state.mobs = state.mobs.filter((item) => item.id !== action.payload.id)

      if (action.payload.noComplete && action.payload.bossId) {
        state.totalMobs[action.payload.bossId] =
          (state.totalMobs[action.payload.bossId] || 0) - 1
      }
    }
  }

})
export const {addMob, removeMob} = mobsSlice.actions
export default mobsSlice.reducer

export const selectedTotalMobs = (state: RootState, bossId: string) => {
  return state.mobs.totalMobs[bossId] || 0
}