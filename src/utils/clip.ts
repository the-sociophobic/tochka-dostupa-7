const clip = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))


export default clip