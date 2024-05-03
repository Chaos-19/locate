import { getNumValue } from "@/constants";
import { convertDMSToLatLong, float2int } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type coord = {
    lat: number
    lng: number
}
export type pointOnMapType = {
    id: number
    coord: coord,
    pointMataData: {
        name: string
    }
}

interface MapPointStateType {
    pointOnMap: pointOnMapType[];
    connectedPoints: {
        startPoint: pointOnMapType,
        endPoint: pointOnMapType
    }[];
    userLocation: coord | null
}

const initalState: MapPointStateType = {
    pointOnMap: [],
    connectedPoints: [],
    userLocation: {
        lat: 0,
        lng: 0
    }
}
const mapPointSlice = createSlice({
    name: 'mapPoint',
    initialState: initalState,
    reducers: {
        setPointOnMap: (state, action: PayloadAction<Pick<pointOnMapType, | 'coord' | 'pointMataData'>>) => {
            if (state.pointOnMap.findIndex((point) => point.coord.lat === action.payload.coord.lat && point.coord.lng === action.payload.coord.lng) == -1) {
                state.pointOnMap.push({ ...action.payload, id: Date.now() })
            }
        },
        updatePonitMap: (state, action: PayloadAction<Pick<pointOnMapType, | 'coord' | 'pointMataData'>>) => {
            const preState = state.pointOnMap.filter((point) => point.pointMataData.name !== action.payload.pointMataData.name)
            const preStateIndex = state.pointOnMap.findIndex((point) => point.pointMataData.name === action.payload.pointMataData.name)
            state.pointOnMap = [...preState, {
                ...state.pointOnMap[preStateIndex],
                coord: action.payload.coord
            }]
        },
        setPointOnMapFromDMS: (state, action: PayloadAction<{ coord: string, name: string }>) => {
            const latDMS = `${float2int(state.userLocation?.lat as number)}° ${getNumValue(action.payload.coord[0])}' ${getNumValue(action.payload.coord[1])}"`
            const lngMS = `${float2int(state.userLocation?.lng as number)}° ${getNumValue(action.payload.coord[2])}' ${getNumValue(action.payload.coord[3])}"`

            const lat = convertDMSToLatLong(latDMS);
            const lng = convertDMSToLatLong(lngMS);

            if (state.pointOnMap.findIndex((point) => point.coord.lat === lat && point.coord.lng === lng) == -1) {
                state.pointOnMap.push({
                    coord: { lat, lng },
                    pointMataData: { name: action.payload.name },
                    id: Date.now()
                })
            }
        },

        updataPointOnMapFromDMS: (state, action: PayloadAction<{ coord: string, name: string, id: number }>) => {
            const latDMS = `${float2int(state.userLocation?.lat as number)}° ${getNumValue(action.payload.coord[0])}' ${getNumValue(action.payload.coord[1])}"`
            const lngMS = `${float2int(state.userLocation?.lng as number)}° ${getNumValue(action.payload.coord[2])}' ${getNumValue(action.payload.coord[3])}"`

            const lat = convertDMSToLatLong(latDMS);
            const lng = convertDMSToLatLong(lngMS);

            const preState = state.pointOnMap.filter((point) => point.id !== action.payload.id)
            const preStateIndex = state.pointOnMap.findIndex((point) => point.id === action.payload.id)
            state.pointOnMap = [...preState, {
                ...state.pointOnMap[preStateIndex],
                coord: {
                    lat,
                    lng
                },
                pointMataData: {
                    name: action.payload.name
                }
            }]
        },
        deletePointOnMap: (state, action: PayloadAction<number>) => {
            state.pointOnMap = state.pointOnMap.filter((point) => point.id !== action.payload)
        },
        setConnectPoint: (state, action: PayloadAction<{ startPoint: number, endPoint: number }>) => {

            state.connectedPoints.push({
                startPoint: state.pointOnMap[action.payload.startPoint],
                endPoint: state.pointOnMap[action.payload.endPoint]
            })
        },
        setUserLocation: (state, action: PayloadAction<coord>) => {
            state.userLocation = action.payload
        }
    }
})

export const {
    setPointOnMap,
    updatePonitMap,
    setConnectPoint,
    setUserLocation,
    setPointOnMapFromDMS,
    updataPointOnMapFromDMS,
    deletePointOnMap } = mapPointSlice.actions

export const selectPointOnMap = (state: { map: MapPointStateType }) => state.map.pointOnMap
export const selectConnectedPoints = (state: { map: MapPointStateType }) => state.map.connectedPoints

export default mapPointSlice.reducer