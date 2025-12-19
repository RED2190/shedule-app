import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isOpen: false,
    msg: "",
  }
  export const alertSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        set( state, action ){
            state.msg = action.payload
            state.isOpen = true
        },
        close( state ){
          state.msg = ""
          state.isOpen = false
        }
    }
  })

  export const { set, close } = alertSlice.actions
  
  export default alertSlice.reducer