import axios from 'axios'

import isProd from './isProd'


axios.defaults.headers.post['Accept'] = "*/*"
axios.defaults.headers.post['Content-Type'] = "json"
axios.defaults.withCredentials = true


const APIlink = () =>
  isProd() ?
    "http://api.tochkadostupa.spb.ru"
    :
    "http://localhost:3000"

const post = async (endpoint: string, data: any) =>
  (await axios.post(
    APIlink() + endpoint,
    data,
  )).data


const getUser = async (sessionToken: string) => {
  const res = await post('/session', sessionToken)

  return res
}

const logout = async (sessionToken: string) => {
  const res = await post('/logout', sessionToken)

  return res
}


export {
  getUser,
  logout,
}