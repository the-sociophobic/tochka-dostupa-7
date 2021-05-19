const radarioProps = (ticket_id?: string, widget_id?: string) => ({
  // 'href': {href},
  'data-radario-event-id': ticket_id || 765096,
  'data-radario-group-id': widget_id,
  'data-accent-color': '#af473a',
  'data-custom-width': '800px',
  'data-page-background-color': 'transparent',
  'data-tickets-name-color': '#000000',
  'data-custom-color': 'af473a',
  'data-radario-noheader': 'true',
})


export default radarioProps