import React from 'react'
import * as d3 from 'd3'
import SankeyonMap from './sankey'

class HumanFateSankey extends React.Component {
  state = {
    data: null,
    width: 0,
    height: 0
  }

  componentDidMount() {
    d3.json('/main-sankey-data.json').then(data =>
      this.setState({ data})
    )
  }
  render () {
    const { data } = this.state;
    return (
      <svg
        ref={this.svgRef}
        className='main-sankey'
      >
        {data && (
            <SankeyonMap
              data={data}
              width={120}
              height={100}
            />
        )}
      </svg>
    );
  }
}

export default HumanFateSankey;
