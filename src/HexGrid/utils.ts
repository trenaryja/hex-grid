import { Svg } from '@svgdotjs/svg.js'

export const downloadPng = (svg: Svg, width: number, height: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const blob = new Blob([svg.svg()], { type: 'image/svg+xml;charset=utf-8' })
  const img = new Image()

  img.onload = () => {
    canvas.getContext('2d')!.drawImage(img, 0, 0)
    canvas.toBlob((blob) => {
      const fileName = `Hex-${+new Date()}.png`
      downloadBlob(blob!, fileName)
    }, 'image/png')
  }

  img.src = URL.createObjectURL(blob)
}

export const downloadSvg = (svg: Svg) => {
  const fileName = `Hex-${+new Date()}.svg`
  const blob = new Blob([svg.svg()], { type: 'image/svg+xml;charset=utf-8' })
  downloadBlob(blob, fileName)
}

export const downloadBlob = (blob: Blob, fileName: string) => {
  const data = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = fileName
  link.href = data
  link.click()
}

// export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
