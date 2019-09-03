import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import { worldMap } from '../static/mapJson';
import { sankeyCoordinates } from '../static/sankeyData';
import HumanFateSankey from './chart';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
}

const mapStyle = {
  fill: "#607D8B",
  stroke: "none",
  strokeWidth: 0.75,
  outline: "none"
}

class Map extends Component {
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          className='world-map'
          >
          <ZoomableGroup center={[0,20]} disablePanning>
            <Geographies geography={worldMap}>
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: mapStyle,
                    hover: mapStyle,
                    pressed: mapStyle
                  }}
                />
              ))}
            </Geographies>
            <Markers>
              {sankeyCoordinates.map((continent, i) =>
                <Marker
                  key={i}
                  marker={continent}
                >
                <circle cx={20} cy={20} r={5} fill="pink" stroke="#607D8B" />
                </Marker>
              )}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default Map
