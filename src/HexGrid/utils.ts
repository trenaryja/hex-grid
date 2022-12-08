import { Svg } from '@svgdotjs/svg.js'

export const svg2png = (svg: Svg, width: number, height: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const blob = new Blob([svg.svg()], { type: 'image/svg+xml;charset=utf-8' })
  const img = new Image()

  img.onload = () => {
    canvas.getContext('2d')!.drawImage(img, 0, 0)
    canvas.toBlob((blob) => {
      const fileName = `Hex-${+new Date()}.png`
      const data = URL.createObjectURL(blob!)
      const link = document.createElement('a')
      link.download = fileName
      link.href = data
      link.click()
    }, 'image/png')
  }

  img.src = URL.createObjectURL(blob)
}

// export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
