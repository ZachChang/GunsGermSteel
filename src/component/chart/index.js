import React from 'react'
import * as d3 from 'd3'
import SankeyonMap from './sankey'

class HumanFateSankey extends React.Component {
  state = {
    data: null,
    width: 0,
    height: 0
  }
  svgRef = React.createRef();

  componentDidMount() {
    d3.json('/main-sankey-data.json').then(data =>
      this.setState({ data})
    )
    this.measureSVG();
    window.addEventListener("resize", this.measureSVG);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.measureSVG);
  }
  measureSVG = () => {
    const { width, height } = this.svgRef.current.getBoundingClientRect();

    const test1 = this.svgRef.current;
    const test2 = this.svgRef.current.getBoundingClientRect()

    console.log({
      width,
      height,
      test1,
      test2
    });

    this.setState({
      width,
      height
    });
  };
  render () {
    const { data, width, height } = this.state;
    return (
      <svg
        ref={this.svgRef}
        className='main-sankey'
      >
        {data && (
            <SankeyonMap
              data={data}
              width={width}
              height={height}
            />
        )}
      </svg>
    );
  }
}

export default HumanFateSankey;
