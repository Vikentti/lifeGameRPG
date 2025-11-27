import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {nanoid} from 'nanoid'

import type {Boss} from "../../types/bossTypes";
import {addMiniBoss} from "./miniBossSlice";
import {addMob} from "./mobsSlice";
import checkTask from "./StatsArr/Statistic"

interface bossState {
  bosses: Boss[]
  totalBosses: Record<string, number>
}

const loadFromLocalStorage = (): bossState => {

  if (typeof window === 'undefined') {
    return {bosses: [], totalBosses: {}};
  }

  try {
    const data = localStorage.getItem('bosses')
    if (data) {
      const parse = JSON.parse(data)

      if (Array.isArray(parse)) {
        return {
          bosses: parse,
          totalBosses: parse.reduce((acc, boss) => {
            acc[boss.id] = (acc[boss.id] || 0) + 1
            return acc
          }, {} as Record<string, number>)
        }
      }
      return parse
    }
    return {bosses: [], totalBosses: {}};
  } catch {
    return {bosses: [], totalBosses: {}};
  }
}

const initialState: bossState = loadFromLocalStorage()

const bossesSlice = createSlice({
  name: "bosses",
  initialState,
  reducers: {
    addBoss: (state, action: PayloadAction<Omit<Boss, 'id' | 'xp' | 'hp' | 'maxHp' | 'stat'>>) => {
      const baseHp = Math.floor(Math.random() * (300 - 200) + 200)
      const stat = checkTask(action.payload.title)

      const newBoss = {
        ...action.payload,
        id: nanoid(),
        maxHp: baseHp,
        hp: baseHp,
        xp: 100,
        stat: `${stat[0]}`,
      }

      state.bosses.push(newBoss)
      state.totalBosses[newBoss.id] =
        (state.totalBosses[newBoss.id] || 0) + 1
    },
    removeBoss: (state, action: PayloadAction<string>) => {
      state.bosses = state.bosses.filter((item) => item.id !== action.payload)
    },
    removeAllBosses: (state) => {
      state.bosses = []
    },
    damageBoss: (state, action: PayloadAction<{
      id: string,
      damage: number
    }>) => {
      const targetBoss = state.bosses.find((item) => item.id === action.payload.id)
      if (targetBoss) {
        if (targetBoss.hp < action.payload.damage) {
          targetBoss.hp = 0
        } else {
          targetBoss.hp = targetBoss.hp - action.payload.damage
        }
      }
    },
    addHp: (state, action: PayloadAction<{ id: string, upHp: number }>) => {
      const targetBoss = state.bosses.find((item) => item.id === action.payload.id)

      if (targetBoss) {
        targetBoss.maxHp -= action.payload.upHp
        targetBoss.hp -= action.payload.upHp
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMob, (state, action: PayloadAction<{
        bossId: string,
        hp: number
      }>) => {
        const targetBoss = state.bosses.find((item) => item.id === action.payload.bossId)

        if (targetBoss) {
          targetBoss.hp += action.payload.hp
          targetBoss.maxHp += action.payload.hp
        }
      })
      .addCase(addMiniBoss, (state, action: PayloadAction<{
        bossId: string,
        hp: number
      }>) => {
        const targetBoss = state.bosses.find((item) => item.id === action.payload.bossId)

        if (targetBoss) {
          targetBoss.hp += action.payload.hp
          targetBoss.maxHp += action.payload.hp
        }
      })
  }
})

export const {
  addBoss,
  removeBoss,
  removeAllBosses,
  damageBoss,
  addHp
} = bossesSlice.actions
export default bossesSlice.reducer