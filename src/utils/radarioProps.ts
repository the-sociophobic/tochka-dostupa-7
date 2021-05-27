import { MappedShow } from "../components/Store/Types"


const radarioProps = (show: MappedShow) => {
  if (show.ticketsId)
    return ({
      to: `#event/${show.ticketsId}`,
      sameTab: true,
      'data-accent-color': '#b33d26'
    })
    console.log(show)

  if (show.ticketsGroupId)
    return ({
      to: '#',
      sameTab: true,
      'data-radario-group-id': show.ticketsGroupId,
      'data-type': "time-table",
      'data-radario-new-widget': "true",
      'data-accent-color': "#251616",
      'data-page-background-color': "#f5ecec"
    })

  if (show.url)
    return ({
      to: show.url,
      sameTab: false,
    })

  return ({
    to: '',
    disabled: true
  })
}

  // 'data-custom-width': '800px',
  // 'data-page-background-color': 'transparent',
  // 'data-tickets-name-color': '#000000',
  // 'data-custom-color': 'af473a',
  // 'data-radario-noheader': 'true',


export default radarioProps