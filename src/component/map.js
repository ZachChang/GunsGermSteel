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
import Description from './description';
import Sankey from './sankey';
import { styleSet } from './step';
import * as d3 from 'd3';


const mapStyle = {
  fill: "#D5D2CE",
  stroke: "none",
  strokeWidth: 0.75,
  outline: "none"
}

const candidates = [ '72', '12', '12', '51', '1'];
const domesticated = [ '13', '0', '1', '0', '0'];



class Map extends Component {
  constructor() {
    super();
    this.state = {
      stepSet: styleSet[0],

      scrollY: 0,
      step: 0,
      linePostions: [],
      barPostions: [],
      sankeyData: null,
      // sankeyMarker: {
      //   transform: 'rotate(-90deg) translateY(300px)',
      //   transition: 'transform 2.5s ease-in-out, box-shadow 2.5s ease-in-out',
      //   transformOrigin: 'center',
      // },
    };

    // this.onMapScroll = this.onMapScroll.bind(this);
    // this._handleScroll = debounce(this._handleScroll, 2000, {
    //   'leading': true,
    //   'trailing': false
    // });
  }

  _findPostion = (callback) => {
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

    return callback(markersPostion);
  }

  _setLinePostion = (postions) => {
    console.log('line');
    this.setState({
      linePostions: postions
    })
  }

  _setBarChart = (postions) => {
    console.log('bar');
    this.setState({
      barPostions: postions
    })
  }

  // roateMap = () => {
  //   setTimeout(() => {
  //     this._findPostion(this._setBarChart);
  //   }, 1500);
   //  const prevMarker = this.state.sankeyMarker;
   //  const prevWorldMap = this.state.worldMapStyle;
   //  if (this.state.rotate) {
   //    this.setState({
   //      sankeyWidth: 40,
   //      rotate: false,
   //      worldMapStyle: {
   //        ...prevWorldMap,
   //        transform: 'null',
   //      },
   //      sankeyMarker: {
   //        ...prevMarker,
   //        transform: 'rotate(-90deg) translateY(300px)',
   //      }
   //    });
   //  }
   // else {
   //   this.setState({
   //     sankeyWidth: 400,
   //     rotate: true,
   //     worldMapStyle: {
   //       ...prevWorldMap,
   //       transform: 'perspective(600px) rotateX(45deg)'
   //     },
   //     sankeyMarker: {
   //       ...prevMarker,
   //       transform: 'rotate(-90deg) translateY(300px) rotateY(30deg)'
   //     }
   //   })
   // }
  // }

  // _handleScroll = () => {
  //   const { scrollY, step } = this.state;
  //   const currentScrollY = window.scrollY;
  //   const forwoard = currentScrollY > scrollY ? true : false;
  //
  //   if (forwoard) {
  //     if (step===0) {
  //     } else if (step===1) {
  //       this.roateMap();
  //       this.setState({ pathVisibility: 'visible' });
  //     } else if (step===2) {
  //       this.setState({ barStep: 1 });
  //     }
  //     this.setState({
  //       step: step + 1,
  //       scrollY: currentScrollY
  //     })
  //   }
  //   else {
  //     return null;
  //     // this.roateMap();
  //     // this.setState({
  //     //   step: step - 1,
  //     //   scrollY: currentScrollY,
  //     //   pathVisibility: 'hidden'
  //     // })
  //   }
  //   // console.log('onMapScroll', {scrollY, currentScrollY, forwoard, step});
  // }

  // onMapScroll(e){
  //   console.log('onMapScroll');
  //   this._handleScroll();
  // }

  next = () => {
    const { stepSet, step, barPostions } = this.state;
    const newStep = step + 1;

    if (step===1 && barPostions.length===0) {
      console.log('f');
      setTimeout(() => {
        this._findPostion(this._setBarChart);
      }, 1500);
    }

    this.setState({
      step: newStep,
      stepSet: styleSet[newStep]
    })
  }

  back = () => {
    const { stepSet, step } = this.state;
    const newStep = step - 1;
    this.setState({
      step: newStep,
      stepSet: styleSet[newStep]
    })
  }









  componentDidMount() {
    // window.addEventListener('scroll', this.onMapScroll, true);
    this._findPostion(this._setLinePostion);




    d3.json('/main-sankey-data.json').then(data =>
      this.setState({sankeyData: data})
    )
  }
  componentWillUnmount() {
    // window.removeEventListener('scroll', this.onMapScroll, true);
  }
  render() {
    const { sankeyMarker,
      lineMarker,
      sankeyData,
      sankeyWidth,
      showSankey,
      linePostions,
      barPostions,
      step,
      stepSet
    } = this.state;
    return (
      <div className='main-container'>
        <div className='fixed-container'>
          {step===1 ?
            <React.Fragment>
              {linePostions.map((postion, i) =>
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    zIndex: '10',
                    left: postion.x - 3, //reduce the edge width of the body
                    top: postion.y - 122, //reduce the edge width of the body
                    height: 2,
                    backgroundColor: '#F78A64',
                  }}
                  className={`line-animate-${i}`}
                ></div>
              )}
            </React.Fragment> :
              step===2 || step===3 ?
                <React.Fragment>
                  {barPostions.map((postion, i) =>
                  // to set the bar chart height grow from bottom to top, we have to set the child div bottom, so it has nowhere to vertically increase but upwards
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        zIndex: '10',
                        left: postion.x, //reduce the edge width of the body
                        top: postion.y - 120, //reduce the edge width of the body
                        width: postion.width
                      }}
                    >
                      <div style={{ position: 'relative'}}>
                        <div
                          style={{
                            bottom: '0',
                            width: postion.width
                          }}
                          className={`barchart animate-${i}-${stepSet.barStep}`}
                        >
                          <span className={step===2 ? i===4 ? 'top-num' : null : i!==0 ? 'top-num' : null}>
                            {step===2 ? candidates[i] : domesticated[i]}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment> :
                step===4 ?
                <Sankey /> : null
          }
          <ComposableMap
            projectionConfig={{
              scale: 160,
              rotation: [-11,0,0],
            }}
            width={600}
            height={500}
            style={stepSet.worldMapStyle}
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
                          visibility: stepSet.pathVisibility
                        }}
                      />
                    </Marker>
                  )}
                </Markers>
            </ZoomableGroup>
          </ComposableMap>
          {step===2 ?
            <div className='chart-info'>( Numbers of mammalian candidates for domestication )</div> :
            step===3 ?
            <div className='chart-info'>( Numbers of Domesticated species )</div> : null
          }
        </div>
        <Description step={step} next={this.next} back={this.back}/>
      </div>
    )
  }
}

export default Map
