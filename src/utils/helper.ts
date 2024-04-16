import { newLine } from "../context/AppContext";
import { Point } from "../context/types";

const EARTH_RADIUS = 6371; // In kilometers

function toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const angle = 2 * Math.asin(Math.sqrt(a));
    return angle * EARTH_RADIUS;
}

export function getDirectionAndAngle(lat1: number, lon1: number, lat2: number, lon2: number): {
    angle: number;
    distance: number;
    direction: string
} {
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const x = Math.cos(toRadians(lat2)) * Math.sin(dLon);
    const y = Math.cos(toRadians(lat1)) * Math.sin(dLat) -
        Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
    const angle = Math.atan2(y, x);

    // Convert to degrees if needed
    const angleInDegrees = angle * 180 / Math.PI;

    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const directionIndex = Math.round(angle / 45) % 8;
    const direction = directions[directionIndex];

    const distance = haversineDistance(lat1, lon1, lat2, lon2);

    return {
        angle: angleInDegrees,
        distance,
        direction
    };
}

export const getMatchValue = (searchedValue: Point, containerValue: newLine[]): newLine => {
    const index = containerValue.findIndex((value) => {
        if (value.endPoint.latitude === searchedValue.latitude && value.endPoint.longitude === searchedValue.longitude) {
            return true
        }
    })
    return containerValue[index];
}

export const getMatchIndex = (searchedValue: Point, containerValue: newLine[]): number => {
    const index = containerValue.findIndex((value) => {
        if (value.endPoint.latitude === searchedValue.latitude && value.endPoint.longitude === searchedValue.longitude) {
            return true
        }
    })
    return index
}

