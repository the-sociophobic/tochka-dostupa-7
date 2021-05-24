const encodeUrlParams = (params: object) => 
  new URLSearchParams((params as URLSearchParams)).toString()


export default encodeUrlParams