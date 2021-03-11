import axios from 'axios'

import isProd from './isProd'


axios.defaults.headers.post['Accept'] = "*/*"
axios.defaults.headers.post['Content-Type'] = "json"
axios.defaults.withCredentials = true


const APIlink = () =>
  isProd() ?
    "http://api.tochkadostupa.spb.ru"
    :
    "http://localhost:3070"

const post = async (path: string, data: any) =>
  (await axios.post(
    APIlink() + path,
    data,
  )).data


export {
  post,
}