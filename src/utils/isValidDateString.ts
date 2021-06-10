const isValidDateString = (string: string) =>
  !Number.isNaN(Date.parse(string))


export default isValidDateString