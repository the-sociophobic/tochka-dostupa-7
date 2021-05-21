const validatePhone = (phone: string) =>
  /\+7[0-9]{10}$|8[0-9]{10}$/
    .test(String(phone).toLowerCase())


export default validatePhone