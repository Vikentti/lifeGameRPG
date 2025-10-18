import {createSlice} from "@reduxjs/toolkit";
import type {miniBoss} from "../../types/bossTypes";

interface miniBossState {
  miniBosses: miniBoss[]
}

const loadFromLocalStorage = (): miniBoss[] => {
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
  name: "mini bosses",
  initialState,
  reducer: {

  }
})

export default miniBossSlice.reducer