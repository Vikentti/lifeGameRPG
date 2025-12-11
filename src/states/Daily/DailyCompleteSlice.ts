import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {type Category, setCategoryItemDone} from "./DailySlice";

interface DailyCompleteState {
  strength: number;
  dexterity: number;
  intelligence: number;
  health: number;
  social: number;
}

const loadInitialState = (): DailyCompleteState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('dailyComplete')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error('Failed to parse saved state:', error);
      }
    }
  }
  return {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    health: 0,
    social: 0,
  }
}

const initialState: DailyCompleteState = loadInitialState()

const dailyCompleteSlice = createSlice({
  name: 'dailyComplete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCategoryItemDone, (state, action) => {
        const {category} = action.payload
        if (category in state) {
          state[category] += 1
        }
      })
  }
})

// export const {} = dailyCompleteSlice.actions
export default dailyCompleteSlice.reducer