import type {User} from "../../types/useTypes"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";


interface UserState {
  user: User
}

const loadFromLocalStorage = (): User => {

  if (typeof window === 'undefined') {
    return {xp: 0, name: "", lvl: 0}
  }

  try {
    const data = localStorage.getItem('user')
    return data ? JSON.parse(data) : {xp: 0, name: "", lvl: 0}
  } catch {

    return {xp: 0, name: "", lvl: 0}
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
      const requaredXp = (state.user.lvl + 1) * 100

      if (state.user.xp >= requaredXp) {
        state.user.lvl += 1
        state.user.xp -= requaredXp
      }

      localStorage.setItem('user', JSON.stringify(state.user))
    },
    resetUser: (state, action: PayloadAction<number>) => {
        state.user.xp = action.payload
        state.user.lvl = action.payload

      localStorage.setItem('user', JSON.stringify(state.user))
    }
  }
})

export const {
  addXp,
  resetUser,
} = userSlice.actions

export default userSlice.reducer