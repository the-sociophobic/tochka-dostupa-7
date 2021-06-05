import React from 'react'

import FormattedMessage from '../FormattedMessage'

import copyToClipboard from '../../utils/copyToClipboard'


class Spekt extends React.Component {

  state = {
    showTooltip: false
  }

  hideTooltipTimeout: any = -1

  copyToClipboard = () => {
    copyToClipboard('ТОЧКАДОСТУПА35')
    
    this.setState({
      showTooltip: true
    })
    
    if (this.hideTooltipTimeout !== -1)
      clearTimeout(this.hideTooltipTimeout)
    this.hideTooltipTimeout = setTimeout(
      () => {
        this.setState({ showTooltip: false})
        this.hideTooltipTimeout = -1
      }
      , 2000)
  }

  render = () =>
    <div className='FestivalPass FestivalPass--Spekt'>
      <div className='FestivalPass--Spekt__text'>
        <FormattedMessage id='Spekt.FestivalPass.desc' />
        <div
          className='FestivalPass--Spekt__text__promocode'
          onClick={() => this.copyToClipboard()}
        >
          <u>ТОЧКАДОСТУПА35</u>
        </div>
        {this.state.showTooltip &&
          <div className='FestivalPass--Spekt__text__tooltip'>
            <FormattedMessage id='Spekt.FestivalPass.tooltip' />
          </div>
        }
      </div>
      <div className='p p--s'>
        <FormattedMessage id='Spekt.FestivalPass.noReturns' />
      </div>
    </div>
}


export default Spekt