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

const post = async (data: any) =>
  (await axios.post(
    APIlink(),
    data,
  )).data


const getUser = async (sessionToken: string) => {
  const res = await post({ sessionToken: sessionToken })

  return res
}

const logout = async (sessionToken: string) => {
  const res = await post(sessionToken)

  return res
}


export {
  getUser,
  logout,
}