import React from 'react'
import * as d3 from 'd3'
import SankeyonMap from './sankey'

class HumanFateSankey extends React.Component {
  render () {
    const { data, width } = this.props;
    return (
      <svg
        ref={this.svgRef}
        className='main-sankey'
      >
        {data && (
            <SankeyonMap
              data={data}
              width={width}
              height={300}
            />
        )}
      </svg>
    );
  }
}

export default HumanFateSankey;
