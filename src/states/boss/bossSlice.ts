import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Boss} from "../../types/bossTypes";
import {nanoid} from 'nanoid'

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
      const baseHp = Math.floor(Math.random() * (300 - 100) + 100)
      const newBoss = {
        ...action.payload,
        id: nanoid(),
        maxHp: baseHp,
        hp: baseHp,
        xp: Math.floor(Math.random() * (300 - 100) + 100)
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

    makeHit: (state, action: PayloadAction<{id: string, damage: number}>) => {
      const hitBoss = state.bosses.find((item) => item.id === action.payload.id)
      if (hitBoss) {
        if (hitBoss.hp < action.payload.damage) {
          hitBoss.hp = 0
        } else {
          hitBoss.hp = hitBoss.hp - action.payload.damage
        }
      }
      localStorage.setItem('bosses', JSON.stringify(state.bosses))
    }
  },
})

export const {
  addBoss,
  removeBoss,
  removeAllBosses,
  makeHit
} = bossesSlice.actions
export default bossesSlice.reducer