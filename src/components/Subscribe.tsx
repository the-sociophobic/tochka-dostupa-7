import React from 'react'

import axios from 'axios'

import FormattedMessage from './FormattedMessage'
import { Context } from './Store'
import { getMessage } from './Store/locale'
import validateEmail from '../utils/validateEmail'


type State = {
  input: string
  buttonStatus: string
  scroll: number
}


class Subscribe extends React.Component<{}, State> {

  state: State = {
    input: '',
    buttonStatus: '',
    scroll: 0,
  }

  elementRef: any = React.createRef()

  clearFieldsTimeout: any

  static contextType = Context

  componentDidMount = () =>
    window.addEventListener('scroll', () => this.updateScroll())

  componentWillUnmount = () =>
    window.removeEventListener('scroll', () => this.updateScroll())

  updateScroll = () =>
    this.setState({
      scroll: Math.floor(this.elementRef?.current?.getBoundingClientRect().bottom / 3)
    })
    
  post = async () => {
    if (!validateEmail(this.state.input)) {
      this.setState({ buttonStatus: 'Error' })
      this.clearFieldsTimeout = setTimeout(() => this.setState({ buttonStatus: '' }), 2555)
      return
    }

    this.setState({ buttonStatus: 'Loading' })

    const res = await axios.post(
      'https://api.tochkadostupa.spb.ru/subscribe',
      { email: this.state.input }
    )

    console.log(res.data)
    if (res.data?.result?.person_id) {
      this.setState({ buttonStatus: 'Done' })
      this.clearFieldsTimeout = setTimeout(() => this.setState({ input: '', buttonStatus: '' }), 2555)
    } else {
      this.setState({
        buttonStatus: 'Error'
      })
      this.clearFieldsTimeout = setTimeout(() => this.setState({ buttonStatus: '' }), 2555)
    }
  }

  render = () =>
    <div
      ref={this.elementRef}
      className='Subscribe mb-m mb-md-l mb-lg-xl pt-0 pb-3 pt-md-2 pb-md-xs pt-lg-2 pb-lg-m'
    >
      <div className='Subscribe__content'>
        <div
          className='Subscribe__content__container'
          style={{
            left: `-${window.innerWidth >= 768 ? this.state.scroll : 55}px`
          }}
        >
          <div className='d-flex flex-row d-sm-none py-2'>
            <div className='p p--xxxl mr-2'><FormattedMessage id='Home.subscribe.newsletter' /></div>
            <div className='p p--xxxl mr-2'><FormattedMessage id='Home.subscribe.newsletter' /></div>
            <div className='p p--xxxl mr-2'><FormattedMessage id='Home.subscribe.newsletter' /></div>
            <div className='p p--xxxl mr-2'><FormattedMessage id='Home.subscribe.newsletter' /></div>
            <div className='p p--xxxl mr-2'><FormattedMessage id='Home.subscribe.newsletter' /></div>
            <div className='p p--xxxl mr-2'><FormattedMessage id='Home.subscribe.newsletter' /></div>
            <div className='p p--xxxl mr-2'><FormattedMessage id='Home.subscribe.newsletter' /></div>
          </div>
          <div className='d-flex flex-row align-items-center pb-0 pb-md-xs pb-lg-m py-2'>
            <div className='Subscribe__h1 d-none d-sm-block'>
              <FormattedMessage id='Home.subscribe.newsletter' />
            </div>
            <div className='Subscribe__desc'>
              <FormattedMessage id='Home.subscribe.desc' />
            </div>
            <div className='Subscribe__h1 d-none d-sm-block'>
              <FormattedMessage id='Home.subscribe.newsletter' />
            </div>
            <div className='Subscribe__desc'>
              <FormattedMessage id='Home.subscribe.desc' />
            </div>
            <div className='Subscribe__h1 d-none d-sm-block'>
              <FormattedMessage id='Home.subscribe.newsletter' />
            </div>
            <div className='Subscribe__desc'>
              <FormattedMessage id='Home.subscribe.desc' />
            </div>
            <div className='Subscribe__desc'>
              <FormattedMessage id='Home.subscribe.desc' />
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row d-flex flex-column flex-md-row'>
          <div className='col-4 col-md-4 col-lg-7 col-xl-8'>
            <input
              className='Subscribe__input mb-2 mb-md-0'
              value={this.state.input}
              onChange={e => {
                this.setState({
                  input: e.target.value,
                  buttonStatus: ''
                })
                clearTimeout(this.clearFieldsTimeout)
              }}
              placeholder={getMessage(this, 'Home.subscribe.placeholder')}
            />
          </div>
          <div className='col-4 col-md-2 col-lg-5 col-xl-4'>
            <button
              className={`Subscribe__submit Subscribe__submit--${this.state.buttonStatus}`}
              onClick={this.post}
              disabled={this.state.buttonStatus !== ''}
            >
              <FormattedMessage id={`Home.subscribe.submit`} />
            </button>
          </div>
        </div>
      </div>
    </div>
}


export default Subscribe