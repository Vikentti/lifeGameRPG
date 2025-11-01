import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Boss} from "../../types/bossTypes";
import {nanoid} from 'nanoid'
import {addMob} from "./mobsSlice";
import {addMiniBoss} from "./miniBossSlice";

interface bossState {
  bosses: Boss[]
}

const loadFromLocalStorage = (): Boss[] => {

  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem('bosses')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const initialState: bossState = {
  bosses: loadFromLocalStorage()
}

const bossesSlice = createSlice({
  name: "bosses",
  initialState,
  reducers: {
    addBoss: (state, action: PayloadAction<Omit<Boss, 'id' | 'xp' | 'hp' | 'maxHp'>>) => {
      const baseHp = Math.floor(Math.random() * (300 - 200) + 200)
      const newBoss = {
        ...action.payload,
        id: nanoid(),
        maxHp: baseHp,
        hp: baseHp,
        xp: baseHp,
      }
      state.bosses.push(newBoss)
      localStorage.setItem('bosses', JSON.stringify(state.bosses))
    },

    removeBoss: (state, action: PayloadAction<string>) => {
      state.bosses = state.bosses.filter((item) => item.id !== action.payload)
      localStorage.setItem('bosses', JSON.stringify(state.bosses))
    },

    removeAllBosses: (state) => {
      state.bosses = []
      localStorage.setItem('bosses', JSON.stringify(state.bosses))
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
      localStorage.setItem('bosses', JSON.stringify(state.bosses))
    },
    addHp: (state, action: PayloadAction<{ id: string, upHp: number }>) => {
      const targetBoss = state.bosses.find((item) => item.id === action.payload.id)

      if (targetBoss) {
        targetBoss.maxHp += action.payload.upHp
        targetBoss.hp += action.payload.upHp
      }

      localStorage.setItem('bosses', JSON.stringify(state.bosses))
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