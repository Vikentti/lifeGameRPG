import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {miniBoss} from "../../types/bossTypes";
import {nanoid} from "nanoid";

interface miniBossState {
  miniBosses: miniBoss[]
}

const loadFromLocalStorage = (): miniBoss[] => {

  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem('miniBosses')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const initialState: miniBossState = {
  miniBosses: loadFromLocalStorage()
}

const miniBossSlice = createSlice({
  name: "miniBosses",
  initialState,
  reducers: {
    addMiniBoss: (state, action: PayloadAction<{title: string, bossId: string}>) => {
      const health = Math.floor(Math.random() * (100 - 50) + 50)
      const newMiniBoss = {
        ...action.payload,
        id: nanoid(),
        hp: health,
        xp: health,
        maxHp: health,
      }
      state.miniBosses.push(newMiniBoss)

      localStorage.setItem('miniBosses', JSON.stringify(state.miniBosses))
    },

    removeMiniBoss: (state, action: PayloadAction<string>) => {
      state.miniBosses = state.miniBosses.filter((item) => item.id !== action.payload)

      localStorage.setItem('miniBosses', JSON.stringify(state.miniBosses))
    },
    makeHitMiniBoss: (state, action: PayloadAction<{id: string, damage: number}>) => {
      const target = state.miniBosses.find((item) => item.id === action.payload.id)
      if (target) {
        if (target.hp < action.payload.damage) {
          target.hp = 0
        } else {
          target.hp = target.hp - action.payload.damage
        }
      }
      localStorage.setItem('miniBosses', JSON.stringify(state.miniBosses))
    },
    addHpMiniBoss: (state, action: PayloadAction<{id: string, upHp: number}>) => {
      const target = state.miniBosses.find((item) => item.id === action.payload.id)

      if (target) {
        target.maxHp += action.payload.upHp
        target.hp += action.payload.upHp
      }

      localStorage.setItem('miniBosses', JSON.stringify(state.miniBosses))
    },

  }
})

export const {addMiniBoss, removeMiniBoss, makeHitMiniBoss,addHpMiniBoss} = miniBossSlice.actions
export default miniBossSlice.reducer