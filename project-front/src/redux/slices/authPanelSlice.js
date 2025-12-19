import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  isOpenReg: false,
  isOpenLog: false,
}
export const authPanelSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    openReg( state ){
      state.isOpen = true
      state.isOpenReg = true
      state.isOpenLog = false
    },
    openLog( state ){
      state.isOpen = true
      state.isOpenReg = false
      state.isOpenLog = true
    },
    closeReg( state ){
      state.isOpen = false
    },
    closeLog( state ){
      state.isOpen = false
    },
  }
})

export const { openReg, openLog, closeLog, closeReg } = authPanelSlice.actions

export default authPanelSlice.reducer