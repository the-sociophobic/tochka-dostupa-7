import defaultMessages from '../components/Store/locale/defaultMessages'
import camelize from './camelize'
import { LinkObj } from '../components/Store/Types'


const getSubLinks = ( path: string ): LinkObj[] => {
  if (path === '/spekt/laboratoriagranits')
    return getSubLinks('/program')

  const res = Object.keys(defaultMessages[camelize(path.split('/')[1])].pages)
    .map(key => ({
      to: `/${path.split('/')[1].toLowerCase()}/${key === 'QandA' ? 'q&a' : key.toLowerCase()}`,
      id: `${camelize(path.split('/')[1])}.pages.${key}.name`,
      exact: key.match(/QandA|About|Main|Open|Educational/) ? false : true,
    }))

  if (path.match(/\/program|\/spekt\/laboratoriagranits/))
    return [
      ...res.slice(0, 3),
      {
        to: '/spekt/laboratoriagranits',
        id: 'Home.Laba.name',
        exact: true
      },
      ...res.slice(3)
    ]
  
  return res
}


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

const pathToIds = (path: string) => {
  const sections = path
    .split('/')
    .filter(section => section.length > 0)
  const QandAindex = sections.indexOf('q&a')

  return sections
    .slice(0, QandAindex !== -1 ? (QandAindex + 1) : sections.length)
    .map((section, index) =>
      `${sections.slice(0, index + 1)
        .reduce((a, b) =>
          `${a}/${b}`)}`)
    .map(section => pathToId(section))
}


export {
  getSubLinks,
  pathToId,
  pathToIds,
}
