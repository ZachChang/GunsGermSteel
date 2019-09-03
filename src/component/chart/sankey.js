import React from 'react'
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

const SankeyNode = ({ name, x0, x1, y0, y1, color }) => (
  <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={color}>
    <title fill={'black'}>{name}</title>
  </rect>
);

const SankeyLink = ({ link, color }) => (
  <path
    d={sankeyLinkHorizontal()(link)}
    style={{
      fill: "none",
      strokeOpacity: ".3",
      stroke: color,
      strokeWidth: Math.max(1, link.width)
    }}
  />
);

const SankeyonMap = ({ data, width, height }) => {

  const { nodes, links } = sankey()
    .nodeWidth(30)
    .nodePadding(60)
    .extent([[1, 1], [width - 1, height - 5]])(data);

  return (
    <g
      style={{ mixBlendMode: "multiply" }}
      transform="rotate(90 50 50) skewX(50)"
    >
      {nodes.map((node, i) => (
        <SankeyNode
          {...node}
          color={"pink"}
          key={node.name}
        />
      ))}
      {links.map((link, i) => (
        <SankeyLink
          link={link}
          color={"purple"}
          key={i}
        />
      ))}
    </g>
  )
}

export default SankeyonMap
