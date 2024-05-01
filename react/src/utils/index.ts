import L from 'leaflet'

const EARTH_RADIUS = 6371; // In kilometers

function toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

export function haversineDistance(point1: L.LatLng, point2: L.LatLng): number {

    const { lat: lat1, lng: lon1 } = point1;
    const { lat: lat2, lng: lon2 } = point2;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const angle = 2 * Math.asin(Math.sqrt(a));
    return angle * EARTH_RADIUS;
}

/* export function getDirectionAndAngle(poin1: L.LatLng, poin2: L.LatLng): {
    angle: number;
    distance: number;
    direction: string
} {

    const { lat: lat1, lng: lon1 } = poin1;
    const { lat: lat2, lng: lon2 } = poin2;


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

    const distance = haversineDistance(
        {
            lat: lat1,
            lng: lon1
        } as L.LatLng,
        {
            lat: lat2, lng: lon2
        } as L.LatLng);


    return {
        angle: angleInDegrees,
        distance,
        direction
    };
}
 */



export function getDirectionAndAngle(poin1: L.LatLng, poin2: L.LatLng): {
    angle: number;
    distance: number;
    direction: string;
} {

    const { lat: lat1, lng: lon1 } = poin1;
    const { lat: lat2, lng: lon2 } = poin2;

    // Calculate the differences in latitude and longitude
    const latDiff = mapAngle(lat2) - mapAngle(lat1);
    const lonDiff = mapAngle(lon2) - mapAngle(lon1);

    // Handle division by zero and floating-point precision issues
    const epsilon = 0.000001; // A small value to avoid division by zero
    const adjustedLatDiff = Math.abs(latDiff) > epsilon ? latDiff : epsilon;
    const adjustedLonDiff = Math.abs(lonDiff) > epsilon ? lonDiff : epsilon;

    // Calculate the angle from the north (0 to 360 degrees)
    let angle = Math.atan2(adjustedLonDiff, adjustedLatDiff) * (180 / Math.PI);

    angle = ((angle + 90) % 360); // Ensure the angle is positive and within the range [0, 360)


    // Calculate the direction (N, NE, E, SE, S, SW, W, NW)
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const directionIndex = (Math.round(angle / 45)) % 8;

    // Handle edge case: same point
    const direction = poin1.lat === poin2.lat && poin1.lng === poin2.lng ? "Same Point" : directions[directionIndex];

    angle = Math.round(angle * 100) / 100;




    return {
        direction,
        angle,
        distance: haversineDistance(poin1, poin2)
    };
}


function mapAngle(angle: number) {
    return angle * Math.PI / 180;
}

/* function cordinateDistanceCalculator(poin1: L.LatLng, poin2: L.LatLng) {

    const { lat: lat1, lng: lon1 } = poin1;
    const { lat: lat2, lng: lon2 } = poin2;

    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    var calculated = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

    return Math.round(calculated * 100) / 100;
} */

// Assuming you have a library for handling ellipsoidal calculations (e.g., geographiclib)
import * as GeographicLib from 'geographiclib';

export function calculateDistanceLambert(point1: L.LatLng, point2: L.LatLng): number {
    const { lat: lat1, lng: lon1 } = point1;
    const { lat: lat2, lng: lon2 } = point2;

    // Use GeographicLib for Vincenty's formula (approximation of Lambert)
    const geod = GeographicLib?.Geodesic.WGS84;
    const { s12 } = geod.Inverse(lat1, lon1, lat2, lon2);  // s12 is the distance

    return s12 as number; // Distance in meters
}

export function convertToDMS(angle: number): string {
    const degrees = float2int(angle);  // Extract degrees      
    const minutes = float2int((angle - degrees) * 60);  // Extract minutes
    const seconds = float2int(((angle - degrees) * 60 - minutes) * 60);  // Extract seconds
    return `${degrees}° ${minutes}' ${seconds}"`;
}

const float2int = (value: number): number => value | 0;

export function convertDMSToLatLong(dms: string): number {
    const [degrees, minutes, seconds] = dms.match(/(\d+)/g)?.map(parseInt) ?? [0, 0, 0];
    const lat = degrees + minutes / 60 + seconds / 3600;
    return lat
}