import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";

import type {miniBoss} from "../../types/bossTypes";
import type {RootState} from "../store";
import checkTask from "./StatsArr/Statistic";

interface miniBossState {
  miniBosses: miniBoss[]
  totalMiniBosses: Record<string, number>
}

const loadFromLocalStorage = (): miniBossState => {

  if (typeof window === 'undefined') {
    return {miniBosses: [], totalMiniBosses: {}};
  }

  try {
    const data = localStorage.getItem('miniBosses')
    if (data) {
      const parsed = JSON.parse(data)

      if (Array.isArray(parsed)) {
        return {
          miniBosses: parsed,
          totalMiniBosses: parsed.reduce((acc, boss) => {
            acc[boss.bossId] = (acc[boss.bossId] || 0) + 1
            return acc
          }, {})
        }
      }
      return parsed
    }
    return {miniBosses: [], totalMiniBosses: {}};
  } catch {
    return {miniBosses: [], totalMiniBosses: {}}
  }
}

const initialState: miniBossState = loadFromLocalStorage()

const miniBossSlice = createSlice({
  name: "miniBosses",
  initialState,
  reducers: {
    addMiniBoss: (state, action: PayloadAction<{
      title: string,
      bossId: string,
      hp: number,
      stat: string,
    }>) => {

      const newMiniBoss = {
        ...action.payload,
        id: nanoid(),
        xp: 25,
        maxHp: action.payload.hp,
      }
      state.miniBosses.push(newMiniBoss)
      state.totalMiniBosses[action.payload.bossId] =
        (state.totalMiniBosses[action.payload.bossId] || 0) + 1
    },
    removeMiniBoss: (state, action: PayloadAction<{
      id: string,
      noComplete?: boolean,
      bossId?: string,
    }>) => {
      state.miniBosses = state.miniBosses.filter((item) => item.id !== action.payload.id)

      if (action.payload.noComplete && action.payload.bossId) {
        state.totalMiniBosses[action.payload.bossId] =
          (state.totalMiniBosses[action.payload.bossId] || 0) - 1
      }
    },
    damageMiniBoss: (state, action: PayloadAction<{
      id: string,
      damage: number
    }>) => {
      const target = state.miniBosses.find((item) => item.id === action.payload.id)
      if (target) {
        if (target.hp < action.payload.damage) {
          target.hp = 0
        } else {
          target.hp = target.hp - action.payload.damage
        }
      }
    },
    addHpMiniBoss: (state, action: PayloadAction<{
      id: string,
      upHp: number
    }>) => {
      const target = state.miniBosses.find((item) => item.id === action.payload.id)
      if (target) {
        target.maxHp += action.payload.upHp
        target.hp += action.payload.upHp
      }
    },
  }
})

export const {
  addMiniBoss,
  removeMiniBoss,
  damageMiniBoss,
  addHpMiniBoss
} = miniBossSlice.actions
export default miniBossSlice.reducer

export const selectedTotalMiniBoss = (state: RootState, bossId: string) => {
  return state.miniBosses.totalMiniBosses[bossId] || 0
}