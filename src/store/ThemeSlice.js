import { createSlice } from '@reduxjs/toolkit';

const initialState={
    theme:"light",
}

export const themeSlice =createSlice({
    name:"theme",
    initialState,
    reducers:{
        changeTheme:(state)=>{
            state.theme=state.theme==="light"?"dark":"light";
            sessionStorage.setItem("theme",state.theme);
        },
        initializeThemeFromSesionStorgae:(state)=>{
            const storedState = sessionStorage.getItem("theme");
            if(storedState){
                state.theme=storedState;
                
            }
        }
    }
}) ;


export const { changeTheme,initializeThemeFromSesionStorgae } = themeSlice.actions
export default themeSlice.reducer
