import { MappedShow } from "../components/Store/Types"


const radarioProps = (show: MappedShow) =>
  !show.ticketsId && !show.ticketsGroupId ?
    {
      to: '',
      disabled: true
    }
    :
    show.ticketsId ?
      {
        to: `#event/${show.ticketsId}`,
        sameTab: true,
        'data-accent-color': '#b33d26'
      }
      :
      {
        to: '#',
        sameTab: true,
        'data-radario-group-id': show.ticketsGroupId,
        'data-type': "time-table",
        'data-radario-new-widget': "true",
        'data-accent-color': "#251616",
        'data-page-background-color': "#f5ecec"
      }
  // 'data-custom-width': '800px',
  // 'data-page-background-color': 'transparent',
  // 'data-tickets-name-color': '#000000',
  // 'data-custom-color': 'af473a',
  // 'data-radario-noheader': 'true',


export default radarioProps