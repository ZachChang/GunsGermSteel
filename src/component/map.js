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
import * as d3 from 'd3';
import debounce from 'lodash.debounce';

const wrapperStyles = {
  width: 980,
  // margin: '0 auto',
  height: 2000
}

const mapStyle = {
  fill: "#D5D2CE",
  stroke: "none",
  strokeWidth: 0.75,
  outline: "none"
}

class Map extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: 0,
      step: 0,

      barPostions: [],

      pathVisibility: 'hidden',

      lineMarker: {},
      sankeyData: null,
      sankeyWidth: 40,
      rotate: false,
      sankeyMarker: {
        transform: 'rotate(-90deg) translateY(300px)',
        transition: 'transform 2.5s ease-in-out, box-shadow 2.5s ease-in-out',
        transformOrigin: 'center',
      },
      worldMapStyle: {
        width: '100%',
        transform: 'translateX(-200px) translateY(-100px)',
        transition: 'transform 1s ease-in-out, box-shadow 1s ease-in-out'
      }
    };

    this.onMapScroll = this.onMapScroll.bind(this);
    this._handleScroll = debounce(this._handleScroll, 3000, {
      'leading': true,
      'trailing': false
    });
  }

  _findPostion = () => {
    console.log('_findPostion');
    const markersPostion = [];
    for (let i = 0; i < sankeyCoordinates.length; i++) {
      //find each marker's starting point on the map to set bar chart
      let markerRect = document.getElementById(sankeyCoordinates[i].continent).getBoundingClientRect();
      let postion = {
        x: markerRect.left,
        y: markerRect.top + markerRect.height,
        width: markerRect.width
      };
      markersPostion.push(postion);
    }
    console.log({markersPostion});

    this._drawBarChart(markersPostion);
  }

  _drawBarChart = (postions) => {
    console.log('draw');
    this.setState({
      barPostions: postions
    })
  }

  roateMap = () => {
    const prevMarker = this.state.sankeyMarker;
    const prevWorldMap = this.state.worldMapStyle;
    if (this.state.rotate) {
      this.setState({
        sankeyWidth: 40,
        rotate: false,
        worldMapStyle: {
          ...prevWorldMap,
          transform: 'translateX(-200px) translateY(-100px)',
        },
        sankeyMarker: {
          ...prevMarker,
          transform: 'rotate(-90deg) translateY(300px)',
        }
      });
    }
   else {
     this.setState({
       sankeyWidth: 400,
       rotate: true,
       worldMapStyle: {
         ...prevWorldMap,
         transform: 'perspective(600px) rotateX(45deg) translateX(-200px) translateY(-100px)'
       },
       sankeyMarker: {
         ...prevMarker,
         transform: 'rotate(-90deg) translateY(300px) rotateY(30deg)'
       }
     })

     setTimeout(() => {
       this._findPostion();
     }, 1500);
   }
  }

  _handleScroll = () => {
    const { scrollY, step } = this.state;
    const currentScrollY = window.scrollY;
    const forwoard = currentScrollY > scrollY ? true : false;

    if (true) {
      if (step===0) {
        this.setState({pathVisibility: 'visible'});
      } else if (step===1) {
        this.roateMap();
        this.setState({pathVisibility: 'hidden'});
      }
      this.setState({
        step: step + 1,
        scrollY: currentScrollY
      })
    } else {
      this.setState({
        step: step - 1,
        scrollY: currentScrollY
      })
    }
    console.log('onMapScroll', {scrollY, currentScrollY, forwoard, step});
  }

  onMapScroll(e){
    console.log('onMapScroll');
    this._handleScroll();
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onMapScroll, true);

    d3.json('/first-sankey-data.json').then(data =>
      this.setState({sankeyData: data})
    )
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onMapScroll, true);
  }
  render() {
    const { sankeyMarker,
      lineMarker,
      worldMapStyle,
      sankeyData,
      sankeyWidth,
      showSankey,
      barPostions,
      pathVisibility,
      step
    } = this.state;
    return (
      <div style={wrapperStyles} onScroll={this.onMapScroll}>
        <div className='fixed-container'>
          {step===2 &&
            barPostions.map((postion, i) =>
            // to set the bar chart height grow from bottom to top, we have to set the child div bottom, so it has nowhere to vertically increase but upwards
              <div
                key={i}
                style={{
                  position: 'absolute',
                  zIndox: '10',
                  left: postion.x - 8 , //reduce the edge width of the body
                  top: postion.y - 8 , //reduce the edge width of the body
                  width: postion.width
                }}
              >
                <div style={{ position: 'relative'}}>
                  <div
                    style={{
                      bottom: '0',
                      width: postion.width
                    }}
                    className={`barchart animate-${i}`}
                  ></div>
                </div>
              </div>
            )
          }
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
                <Markers style={showSankey ? sankeyMarker : lineMarker}>
                  {sankeyCoordinates.map((continent, i) =>
                    <Marker
                      key={i}
                      marker={continent}
                    >
                      <rect
                        id={continent.continent}
                        width={continent.width}
                        height={2}
                        style={{
                          fill: 'F78A64',
                          visibility: pathVisibility
                        }}
                      />
                    </Marker>
                  )}
                </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    )
  }
}

export default Map
