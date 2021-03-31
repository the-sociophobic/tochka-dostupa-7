import camelize from './camelize'


const pathToId = (path: string) => {
  const sections = path
    .split('/')
    .filter(section => section.length > 0)
    .map(section => section === 'q&a' ? 'QandA' : camelize(section))

  switch (sections.length) {
    case 0:
      return '#no path#'
    case 1:
      return `${sections[0]}.name`
    case 2:
      return `${sections[0]}.pages.${sections[1]}.name`
  }
}


export default pathToId
