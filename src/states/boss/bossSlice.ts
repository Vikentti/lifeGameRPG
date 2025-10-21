import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Boss} from "../../types/bossTypes";
import { nanoid } from 'nanoid'

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
    addBoss: (state, action: PayloadAction<Omit<Boss, 'id'>>) => {
      const newBoss = {
        ...action.payload,
        id: nanoid(),
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
  },
})

export const {addBoss, removeBoss, removeAllBosses} = bossesSlice.actions
export default bossesSlice.reducer