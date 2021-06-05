import React from 'react'

import FormattedMessage from '../FormattedMessage'
import Link from '../Link'


class Schedule extends React.Component {

  render = () =>
    <div className='FestivalPass FestivalPass--Schedule'>
      <div className='col-4 col-md-2 col-lg-4'>
        <div className='FestivalPass--Schedule__h1'>
          <FormattedMessage id='Home.festivalPass.1' />
        </div>
      </div>
      <div className='col-4 col-md-2 col-lg-4'>
        <div className='FestivalPass--Schedule__small'>
          <FormattedMessage id='Schedule.festivalPassDesc' />
        </div>
      </div>
      <div className='col-4 col-md-2 col-lg-4'>
        <Link
          to='https://special.tochkadostupa.spb.ru/abonement'
          className='FestivalPass--Schedule__button'
        >
          <FormattedMessage id='Home.festivalPass.buy' />
        </Link>
      </div>
    </div>
}


export default Schedule