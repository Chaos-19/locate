import { ImageOverlay, MapContainer, Polyline, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import { createLayerComponent } from '@react-leaflet/core'
import Tools from './components/Tools'
import MapMarkers from './features/map/MapMarkers'
import { useAppSelector } from './app/hooks'
import { getDirectionAndAngle } from './utils'
import protracter from "./assets/img.png"






class DebugCoords extends L.TileLayer {

  createTile(coords: L.Coords, done: L.DoneCallback) {
    const tile: HTMLElement = document.createElement('div')
    tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');

    tile.style.outline = '0.101px solid #fff';

    setTimeout(function () {
      done(undefined, tile);	// Syntax is 'done(error, tile)'
    }, 500 + Math.random() * 1500);

    return tile;
  }
}


interface DebugCoordsProps {
}
const DebugCoordsLayer = (props: DebugCoordsProps, context: any) => {
  const instance = new DebugCoords("placeholder", { ...props });
  return { instance, context }
}

/* const DebugCoordsLayerUpdate = (instance: any, props: DebugCoordsProps, prevProps: DebugCoordsProps) => {
  instance.setUrl("placeholder")
} */

const DebugCoordsLayerComponent = createLayerComponent(DebugCoordsLayer/* , DebugCoordsLayerUpdate */)



const App = () => {

  const holeSate = useAppSelector((state) => state.map)

  const center = useAppSelector((state) => state.map.userLocation)
  /*   const dispatch = useAppDispatch()
  
    const userLocation = useAppSelector((state) => state.map.userLocation) */


  return (
    <MapContainer
      center={center as L.LatLng}
      zoom={0}
      maxZoom={30}
      scrollWheelZoom={true}
      style={{
        height: '100vh',
        width: '100wv',
      }}
    >
      <Tools />
      <DebugCoordsLayerComponent />
      <MapMarkers />
      {holeSate.pointOnMap.slice(1).map((point) => {
        const { direction, distance } = getDirectionAndAngle(holeSate.userLocation as L.LatLng, point.coord as L.LatLng);
        return (
          <Polyline
            key={point.id}
            positions={[holeSate.userLocation as L.LatLng, point.coord]}
          >
            <Tooltip
              direction="auto"
              opacity={1}
              permanent
            >
              <p>distance :{(distance)} Km</p>
              <p>Direction : {direction}</p>
            </Tooltip>
          </Polyline>
        )
      })}
      <ImageOverlay
        url={protracter}
        bounds={
          [[center?.lat as number - 0.5 / 10, center?.lng as number - 0.5 / 10],
          [center?.lat as number + 0.5 / 10, center?.lng as number + 0.5 / 10]]
        } zIndex={40} />
    </MapContainer>
  )
}

export default App
