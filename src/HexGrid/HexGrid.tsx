import { StrokeData, SVG } from '@svgdotjs/svg.js'
import { defineHex, Grid, Orientation, rectangle } from 'honeycomb-grid'
import { svg2png } from './utils'

const screenWidth = window.screen.width * window.devicePixelRatio
const screenHeight = window.screen.height * window.devicePixelRatio
const screenScale = 1 / 1.3

interface HexStyles {
  stroke: StrokeData
  fill: string
}

export interface HexGridProps {
  width?: number
  height?: number
  sideLength?: number
  orientation?: 'flat' | 'pointy'
  center?: 'horizontally' | 'vertically'
  hexScale?: number
}

export const HexGrid = (props: HexGridProps) => {
  console.log(screenWidth)
  const {
    width = screenWidth * screenScale,
    height = screenHeight * screenScale,
    orientation = 'flat',
    center = 'horizontally',
    sideLength,
    hexScale = 10,
  } = props

  const sizeCalculations = {
    horizontally: {
      flat: width / (3 * hexScale),
      pointy: width / hexScale / Math.sqrt(3),
    },
    vertically: {
      flat: height / hexScale / Math.sqrt(3),
      pointy: height / (3 * hexScale),
    },
  }

  const size = sideLength ?? sizeCalculations[center][orientation]
  const longDimensionCount = (px: number) => Math.ceil((2 * px - size) / (3 * size)) + 1
  const shortDimensionCount = (px: number) => Math.round(px / (Math.sqrt(3) * size)) + 1
  const cols = orientation === 'flat' ? longDimensionCount(width) : shortDimensionCount(width)
  const rows = orientation === 'flat' ? shortDimensionCount(height) : longDimensionCount(height)

  const Hex = defineHex({
    dimensions: size,
    orientation: orientation === 'flat' ? Orientation.FLAT : Orientation.POINTY,
  })

  const getHexStyles = (hex: InstanceType<typeof Hex>): HexStyles => {
    const fill = '#323842'
    const stroke = { width: 1, color: '#181a21' }
    return { stroke, fill }
  }

  const svg = SVG().size(width, height)
  const grid = new Grid(Hex, rectangle({ width: cols, height: rows }))
  grid.forEach((hex) => {
    const points = hex.corners.map(({ x, y }) => `${x},${y}`).join(' ')
    const { stroke, fill } = getHexStyles(hex)
    svg.group().add(SVG().polygon(points).fill(fill).stroke(stroke))
  })

  const download = () => svg2png(svg, width, height)

  return (
    <div
      onDoubleClick={download}
      style={{ height: height, width: width }}
      dangerouslySetInnerHTML={{ __html: svg.node.outerHTML }}
    />
  )
}
