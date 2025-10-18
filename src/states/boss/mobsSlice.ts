import {createSlice} from "@reduxjs/toolkit";
import type {mob} from "../../types/bossTypes";

interface mobState {
  mobs: mob[]
}

const loadFromLocalStorage = (): mob[] => {
  try {
    const data = localStorage.getItem('mobs')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const initialState: mobState = {
  mobs: loadFromLocalStorage()
}

const mobsSlice = createSlice({
  name: "mobs",
  initialState,
  reducer: {

  }
})

export default mobsSlice.reducer