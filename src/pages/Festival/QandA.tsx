import React from 'react'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import Link from '../../components/Link'
import { Context } from '../../components/Store'
import {
  QandAsection,
  QandAitem
} from '../../components/Store/Types'
import Dropdown from '../../components/Dropdown'
import HorizontalShowcase from '../../components/HorizontalShowcase'


type PathParamsType = {
  param1: string,
}

type State = {
  currentOpened: number
}

class QandA extends React.Component<RouteComponentProps<PathParamsType>, State> {
  
  state: State = {
    currentOpened: 0
  }

  static contextType = Context

  getCurrentSection = () => {
    const page = this.context?.contentful?.festivalQandAs?.[0]
    let currentSectionURL = this.props.location.pathname.replace('/festival/q&a', '').replace('/', '')
    
    if (page && currentSectionURL === '') {
      currentSectionURL = page?.sections?.[0].url
      this.props.history.replace({ pathname: `/festival/q&a/${currentSectionURL}` })
    }

    return page?.sections
      ?.find((section: QandAsection) =>
        section.url === currentSectionURL)
  }

  renderLink = (section: QandAsection) =>
    <Link
      key={section.url}
      to={`/festival/q&a/${section.url}`}
      className='QandA__Link'
      activeClassName='QandA__Link--active'
    >
      {section.name}
    </Link>

  render = () => {
    const page = this.context?.contentful?.festivalQandAs?.[0]
    const currentSection = this.getCurrentSection()

    return !page ? '' :
      <div className="QandA">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1 className='h1 mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl'>
                {page.name}
              </h1>
            </div>
          </div>
        </div>
        <HorizontalShowcase
          className='d-block d-lg-none mb-s mb-md-m'
          items={page?.sections}
          ItemComp={this.renderLink}
        />
        <div className='container'>
          <div className='row'>
            <div className='d-none d-lg-flex flex-column col-4 pt-3 align-items-start'>
              {page?.sections
                ?.map(this.renderLink)}
            </div>
            <div className='col-4 col-md-6 col-lg-8'>
              {currentSection?.items
                ?.map((item: QandAitem, index: number) =>
                  <Dropdown
                    key={item.title}
                    spekt
                    title={<h3 className='h3 mb-0'>{item.title}</h3>}
                    className='mb-2 mb-md-3'
                    opened={this.state.currentOpened === index}
                    toggleOpened={() =>
                      this.setState({
                        currentOpened: this.state.currentOpened === index ?
                          -1
                          :
                          index
                      })}
                  >
                    {item.text}
                  </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
  }
}


export default withRouter(QandA)