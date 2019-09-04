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
import * as d3 from 'd3'

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: '0 auto'
}

const mapStyle = {
  fill: "#607D8B",
  stroke: "none",
  strokeWidth: 0.75,
  outline: "none"
}

class Map extends Component {
  constructor() {
    super();
    this.state = {
      sankeyData: null,
      sankeyWidth: 40,
      rotate: false,
      markerStyle: {
        transform: 'rotate(-90deg) translateY(300px)',
        transition: 'transform 2.5s ease-in-out, box-shadow 2.5s ease-in-out',
        transformOrigin: 'center',
      },
      worldMapStyle: {
        width: '100%',
        transform: 'translateX(-100px)',
        transition: 'transform 1s ease-in-out, box-shadow 1s ease-in-out'
      }
    };
  }
  next = () => {
    const prevMarker = this.state.markerStyle;
    const prevWorldMap = this.state.worldMapStyle;
    if (this.state.rotate) {
      this.setState({
        sankeyWidth: 40,
        rotate: false,
        worldMapStyle: {
          ...prevWorldMap,
          transform: 'translateX(-100px)',
        },
        markerStyle: {
          ...prevMarker,
          transform: 'rotate(-90deg) translateY(300px)',
        }
      });

      setTimeout(
        d3.json('/first-sankey-data.json').then(data =>
          this.setState({
            sankeyData: data,
          }))
        ,2500);
    }
   else {
     this.setState({
       sankeyWidth: 400,
       rotate: true,
       worldMapStyle: {
         ...prevWorldMap,
         transform: 'perspective(600px) rotateX(45deg) translateX(-100px)'
       },
       markerStyle: {
         ...prevMarker,
         transform: 'rotate(-90deg) translateY(300px) rotateY(30deg)'
       }
     })

     setTimeout(
       d3.json('/main-sankey-data.json').then(data =>
         this.setState({
           sankeyData: data,
         }))
       ,2500);


   }
  }
  componentDidMount() {
    d3.json('/first-sankey-data.json').then(data =>
      this.setState({sankeyData: data})
    )
  }
  render() {
    const { markerStyle, worldMapStyle, sankeyData, sankeyWidth } = this.state;
    return (
      <div style={wrapperStyles}>
        <div onClick={this.next}>
          BUTTON
        </div>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={800}
          style={worldMapStyle}
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
            <Markers style={markerStyle}>
              {sankeyCoordinates.map((continent, i) =>
                i===0 ?
                  <Marker
                    key={i}
                    marker={continent}
                  >
                  {sankeyData && (
                    <HumanFateSankey data={sankeyData} width={sankeyWidth}/>
                  )}
                  </Marker>
                : null
              )}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default Map
