import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import axios from '../../axios'
import { act } from 'react'
import { responseAlert } from '../../utils/responseAlert'
export const fetchFilesData = createAsyncThunk('files/fetchFilesData', async(params) => {
  const { data } = await axios.post("/files", params)
  return data
})

const initialState = {
  data: null,
  status: 'loading',
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers:{
    updateState: responseAlert
  },
  extraReducers(builder) {
    builder

        // Изменение файла
        .addCase(fetchFilesData.pending, (state) => {
          state.status = "loading"
        })
        .addCase(fetchFilesData.fulfilled, responseAlert)
        .addCase(fetchFilesData.rejected, (state) => {
            state.status = "failed"
        })
}
})
export default filesSlice.reducer
export const { updateState } = filesSlice.actions