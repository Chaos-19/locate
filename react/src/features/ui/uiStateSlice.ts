import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiStateType = {
    drawLine: boolean;
    lineToDraw: {
        start: {
            lat: number
            lng: number
        }, end: {
            lat: number
            lng: number
        }
    }
}

const initalState: UiStateType = {
    drawLine: false,
    lineToDraw: {
        start: {
            lat: 0,
            lng: 0
        },
        end: {
            lat: 0,
            lng: 0
        }
    }
}

const uiStateSlice = createSlice({
    name: 'ui',
    initialState: initalState,
    reducers: {
        setDrawLine: (state) => {
            state.drawLine = !state.drawLine
        },

        setLineToDrawStart: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
            state.lineToDraw = { ...state.lineToDraw, start: action.payload }
        },

        setLineToDrawEnd: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
            state.lineToDraw = { ...state.lineToDraw, end: action.payload }
        }

    }
})

export const { setDrawLine, setLineToDrawStart, setLineToDrawEnd } = uiStateSlice.actions

export const selectDrawLine = (state: { ui: UiStateType }) => state.ui.drawLine

export const selectLineToDraw = (state: { ui: UiStateType }) => state.ui.lineToDraw

export default uiStateSlice.reducer