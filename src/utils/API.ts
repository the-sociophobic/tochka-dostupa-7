import axios from 'axios'

import isProd from './isProd'


// axios.defaults.headers.post['Accept'] = "*/*"
// axios.defaults.headers.post['Content-Type'] = "json"
// axios.defaults.withCredentials = true


const APIlink = () =>
  isProd() ?
    "https://api.tochkadostupa.spb.ru"
    :
    "http://localhost:3070"
    // "https://api.tochkadostupa.spb.ru"

const post = async (path: string, data: any) =>
  (await axios.post(
    APIlink() + path,
    data,
  )).data

const get = async (path: string) =>
  (await axios.get(
    APIlink() + path,
  )).data


export {
  post,
  get,
}