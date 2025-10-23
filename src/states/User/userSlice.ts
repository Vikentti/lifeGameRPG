import type {User} from "../../types/useTypes"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";



interface UserState {
  user : User
}

const loadFromLocalStorage = (): User => {

  if (typeof window === 'undefined') {
    return {xp : 0, name : "", lvl: 0}
  }

  try {
    const data = localStorage.getItem('user')
    return data ? JSON.parse(data) : {xp : 0, name : "", lvl: 0}
  } catch {

    return {xp : 0, name : "", lvl: 0}
  }
}

const initialState: UserState = {
  user: loadFromLocalStorage()
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addXp: (state, action: PayloadAction<number>) => {
      state.user.xp += action.payload

      if (state.user.xp / Math.floor( 100 * Math.pow(state.user.lvl, 1.2)))
      state.user.lvl += 1
      state.user.xp -= Math.floor( 100 * Math.pow(state.user.lvl, 1.2))
    }
  }
})

export const {
  addXp
} = userSlice.actions

export default userSlice.reducer