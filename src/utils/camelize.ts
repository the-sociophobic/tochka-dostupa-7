const camelize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1)


export default camelize