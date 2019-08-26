import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps";
import { worldMap } from '../static/mapJson';
import { sankeyCoordinates } from '../static/sankeyData';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  perspective: 600,
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
          style={{
            width: "100%",
            height: "auto",
            transform: 'rotateX(45deg)'
          }}
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
                  <g>
                  <rect height={85} width={36}><title>node0
There is 4 stuff in this node</title></rect>
                    <circle cx={20} cy={20} r={5} fill="pink" stroke="#607D8B" />
                  </g>
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
