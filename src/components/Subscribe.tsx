import React from 'react'

import axios from 'axios'

import FormattedMessage from '../components/FormattedMessage'
import { Context } from '../components/Store'
import { getMessage } from '../components/Store/locale'


type State = {
  input: string
}


class Subscribe extends React.Component<{}, State> {

  state: State = {
    input: 'артём хуй'
  }

  static contextType = Context

  post = async () => {
    // const instance = axios.create({})

    const res = await axios.post(
      'https://api.tochkadostupa.spb.ru/subscribe',
      this.state.input
    )

    console.log(res.data)
  }

  render = () =>
    <div className='Subscribe mb-m mb-md-l mb-lg-xl pt-0 pb-3 pt-md-2 pb-md-xs pt-lg-2 pb-lg-m'>
      <div className='Subscribe__content'>
        <div className='Subscribe__content__container'>
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
              onChange={e => this.setState({ input: e.target.value })}
              placeholder={getMessage(this, 'Home.subscribe.placeholder')}
            />
          </div>
          <div className='col-4 col-md-2 col-lg-5 col-xl-4'>
            <button
              className='Subscribe__submit'
              onClick={this.post}
            >
              <FormattedMessage id='Home.subscribe.submit' />
            </button>
          </div>
        </div>
      </div>
    </div>
}


export default Subscribe