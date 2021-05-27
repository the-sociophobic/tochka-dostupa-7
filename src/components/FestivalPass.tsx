import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import Link from '../components/Link'


class FestivalPass extends React.Component<{}, {}> {

  state = {
    scroll: 0
  }

  elementRef: any = React.createRef()

  componentDidMount = () =>
    window.addEventListener('scroll', () => this.updateScroll())

  componentWillUnmount = () =>
    window.removeEventListener('scroll', () => this.updateScroll())

  updateScroll = () =>
    this.setState({
      scroll: Math.floor(this.elementRef?.current?.getBoundingClientRect().bottom / 3)
    })

  render = () =>
    <Link
      outerRef={this.elementRef}
      to='https://special.tochkadostupa.spb.ru/atonement'
      className='FestivalPass mb-m mb-md-l mb-lg-xl pt-0 pb-3 pt-md-2 pb-md-xs pt-lg-2 pb-lg-m'
    >
      <div className='FestivalPass__content'>
        <div
          style={{
            left: `-${window.innerWidth >= 768 ? this.state.scroll : 100}px`
          }}
          className='FestivalPass__content__container FestivalPass__content__container--1'
        >
          <div className='d-flex flex-row align-items-center pb-0 pb-md-xxs pb-lg-xs'>
            <div className='FestivalPass__h1'>
              <FormattedMessage id='Home.festivalPass.2' />
            </div>
            <div className='FestivalPass__desc'>
              <FormattedMessage id='Home.festivalPass.desc' />
            </div>
            <div className='FestivalPass__h1'>
              <FormattedMessage id='Home.festivalPass.1' />
            </div>
          </div>
        </div>
        <div
          style={{
            left: `${window.innerWidth >= 768 ? (this.state.scroll - 500) : -100}px`
          }}
          className='FestivalPass__content__container FestivalPass__content__container--2'
        >
          <div className='d-flex flex-row align-items-center pb-0 pb-md-xxs pb-lg-xs'>
            <div className='FestivalPass__h1'>
              <FormattedMessage id='Home.festivalPass.1' />
            </div>
            <div className='FestivalPass__h1 font-spectral'>
              <FormattedMessage id='Home.festivalPass.price' />
            </div>
            <div className='FestivalPass__h1'>
              <FormattedMessage id='Home.festivalPass.2' />
            </div>
          </div>
        </div>
        <div
          // style={{
          //   left: `-${this.state.scroll}px`
          // }}
          className='FestivalPass__content__container FestivalPass__content__container--3'
        >
          <div className='d-flex flex-row align-items-center pb-0 pb-md-xxs pb-lg-xs'>
            <div className='FestivalPass__h1 d-none d-sm-block'>
              <FormattedMessage id='Home.festivalPass.1' />
            </div>
            <div className='FestivalPass__buy'>
              <FormattedMessage id='Home.festivalPass.buy' />
            </div>
            <div className='FestivalPass__h1 d-none d-sm-block'>
              <FormattedMessage id='Home.festivalPass.2' />
            </div>
          </div>
        </div>
        <div className='container d-md-none'>
          <div className='row'>
            <div className='col py-3'>
              <div className='FestivalPass__buy w-100'>
                <FormattedMessage id='Home.festivalPass.buy' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
}


export default FestivalPass