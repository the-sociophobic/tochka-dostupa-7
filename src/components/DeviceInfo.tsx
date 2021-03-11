const parseDeviceInfo = (props: any) =>
  `${props.osName} ${props.osVersion}, ${props.browserName} ${props.browserFullVersion}`

const DeviceInfo = (props: { data: string }) => {
  const parsedData = JSON.parse(props.data)

  return !parsedData ?
    <></>
    :
    <>
      {parseDeviceInfo(parsedData)}
    </>
}


export default DeviceInfo
export { parseDeviceInfo }