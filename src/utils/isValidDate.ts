const isValidDate = (date: any) =>
  date instanceof Date && !Number.isNaN(date.getTime())


export default isValidDate