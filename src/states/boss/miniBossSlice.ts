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
    addMiniBoss: (state, action: PayloadAction<Omit<miniBoss, 'id'>>) => {
      const newMiniBoss = {
        ...action.payload,
        id: nanoid(),
      }
      state.miniBosses.push(newMiniBoss)
    }
  }
})


export default miniBossSlice.reducer