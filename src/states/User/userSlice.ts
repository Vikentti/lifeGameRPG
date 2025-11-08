import type {User} from "../../types/useTypes"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const defaultUser: User = {
  xp: 0,
  name: "User",
  lvl: 0,
  str: 0,
  agi: 0,
  luck: 0,
  int: 0,
  will: 0,
  wisdom: 0,
  craft: 0,
  legacy: 0,
  diplomacy: 0,
  charisma: 0
};



interface UserState {
  user: User
}


const loadFromLocalStorage = (): User => {

  if (typeof window === 'undefined') {
    return defaultUser
  }

  try {
    const data = localStorage.getItem('user')

    if (data) {
      const parsed = JSON.parse(data)
      return {...defaultUser, ...parsed}
    }
    return defaultUser;
  } catch {

    return defaultUser
  }
}

const initialState: UserState = {
  user: loadFromLocalStorage()
}

const userSlice = createSlice({
  name: "User",
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
      state.user = {
        ...defaultUser,
        xp: action.payload,
        lvl: action.payload
      };

      localStorage.setItem('user', JSON.stringify(state.user))
    },
    addStat: (state, action: PayloadAction<{
      stat: string;
      howMuch: number;
    }>) => {
      const {stat, howMuch} = action.payload;

      if (stat in state.user && typeof state.user[stat as keyof User] === 'number') {
        (state.user[stat as keyof User] as number) += howMuch;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload

      localStorage.setItem('user', JSON.stringify(state.user))
    }
  }
})

export const {
  addXp,
  resetUser,
  addStat,
  setUserName,
} = userSlice.actions

export default userSlice.reducer