import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import regPanelSlice from "./slices/authPanelSlice";
import alertSlice from "./slices/alertSlice";
import filesSlice from "./slices/filesSlice";

const store = configureStore( {
    reducer: { 
        auth: authReducer,
        regPan:  regPanelSlice,
        alertSlice: alertSlice,
        files: filesSlice,
    }
} )

export default store;