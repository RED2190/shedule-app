import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import axios from '../../axios'
import { act } from 'react'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async(params) => {
  const { data } = await axios.post("/auth/registration", params)
  return data
})

export const userUpdate = createAsyncThunk('auth/userUpdate', async(params) => {
  const { data } = await axios.post("/profile/update", params)
  return data
})

export const fetchUserLogin = createAsyncThunk('auth/fetchUserLogin', async(params) => {
  const { data } = await axios.post("/auth/login", params)
  return data
})

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async() => {
  const { data } = await axios.get("/profile")
  return data
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async() => {
  const { data } = await axios.get("/checkAuth")
  return data
})

const initialState = {
  data: null,
  status: 'loading',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    logout: ( state ) => {
      state.data = null
    }
  },
  extraReducers(builder) {
    builder
        // регистрация
        .addCase(fetchUserData.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.status = "loaded"
            state.data = action.payload
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.status = "failed"
        })
        // авторизация
        .addCase(fetchUserLogin.pending, (state) => {
          state.status = "loading"
        })
        .addCase(fetchUserLogin.fulfilled, (state, action) => {
            state.status = "loaded"
            state.data = action.payload
        })
        .addCase(fetchUserLogin.rejected, (state, action) => {
            state.status = "failed"
        })

        // проверка валидности токена
        .addCase(checkAuth.pending, (state) => {
          state.status = "loading"
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.status = "loaded"
            state.data = action.payload
            console.log(state.data)
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.status = "failed"
        })

        // Вся информация о пользователе
        .addCase(fetchUserProfile.pending, (state) => {
          state.status = "loading"
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.status = "loaded"
            state.data = action.payload
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.status = "failed"
        })
        // Обновление информации о пользователе
        .addCase(userUpdate.pending, (state) => {
          state.status = "loading"
        })
        .addCase(userUpdate.fulfilled, (state, action) => {
          let status = action.payload.status
          
          switch(status){
            case(500):
              alert(action.payload.message ? action.payload.message : "Произошла ошибка на сервере. Попробуйте позже")
              break;
            case(400):
              alert(action.payload.message ? action.payload.message : "Ваш запрос не был найден.")
              break;
            case(200):
              if(action.payload.message) alert( action.payload.message )
              state.status = "loaded"
              state.data = action.payload.user
              break;
            default:
              alert("Произошла неизвестная ошибка")
          }
        })
        .addCase(userUpdate.rejected, (a, b) => {
            // state.status = "failed"
        })
}
})
export default authSlice.reducer
export const { logout } = authSlice.actions