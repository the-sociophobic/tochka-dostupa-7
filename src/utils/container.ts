
const containerWidth: any = {
  xs: 300,
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1304
}
const breakpoints: any = {
  xs: 576,
  sm: 768,
  md: 1024,
  lg: 1368,
}

const gutterWidth = 24


const getContainerWidth = () => {
  const windowWidth = window.innerWidth
  let breakpointKey = ''

  Object.keys(breakpoints).forEach(key =>
    breakpointKey === '' &&
    breakpoints[key] > windowWidth &&
      (breakpointKey = key))
  if (breakpointKey === '')
    breakpointKey = 'xl'

  return containerWidth[breakpointKey]
}

const makeCol = (
  size: number,
  columns: number,
  containerWidth: number = getContainerWidth()
) =>
  Math.floor(containerWidth / columns * size)

  
export {
  getContainerWidth,
  gutterWidth,
  makeCol,
}