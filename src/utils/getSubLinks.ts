import defaultMessages from '../components/Store/locale/defaultMessages'
import camelize from './camelize'


const getSubLinks = ( path: string ) =>
  Object.keys(defaultMessages[camelize(path.split('/')[1])].pages)
    .map(key => ({
      to: `/${path.split('/')[1].toLowerCase()}/${key.toLowerCase()}`,
      id: `${camelize(path.split('/')[1])}.pages.${key}.name`
    }))


export default getSubLinks