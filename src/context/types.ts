import { newLine } from "./AppContext";

export interface Point {
    latitude: number,
    longitude: number,
}

export interface Line {
    startPoint: Point;
    endPoint: Point;
}

export interface PointDiscription {
    visible: boolean;
    distance: number;
    direction: string;
    angle: number;
    position: {
        x: number | string;
        y: number | string
    }
}
export interface AppContextValue {
    startLocation: Point | null;
    addPoint: (startPoint: Point, endPoint: Point, name: string, hight: number) => void;
    pointOnMap: newLine[];
    setPointOnMap: (pointOnMap: newLine[]) => void;
    pointDescription: PointDiscription[];
    setPointDescription: (pointDescription: PointDiscription[]) => void;
    pointLength: { length: number, lengthOnScreen: number, index: number }[];
    newL: { length: number, lengthOnScreen: number, index: number }[];
}