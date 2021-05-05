import React from 'react'

import HorizontalShowcase from '../../components/HorizontalShowcase'
import { Context } from '../../components/Store'
import Link from '../../components/Link'
import { FeedbackPreview, Feedback } from '../../components/Store/Types'


class Reviews extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () => {
    console.log(this.context?.contentful)
    const page = this.context?.contentful?.festivalReviewss[0]

    return !page ? '' :
      <div className="Reviews">
        <div className='container'>
          <div className='row mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl'>
            <div className='col'>
              <h1 className='h1'>
                {page.name}
              </h1>
            </div>
          </div>
        </div>
        <HorizontalShowcase
          XXL
          className='mb-m mb-md-l mb-lg-xl'
          items={page.previews}
          ItemComp={(props: FeedbackPreview & { index?: number, className?: string }) =>
            <div className={`
              ${props.className}
              ${(props.index || 0) + 1 !== page.previews.length && 'mr-3'}
              pink-block p-4 p-md-s p-xl-m align-self-stretch d-flex flex-column justify-content-between
            `}>
              <div className='p p--xxl mb-m mb-md-l'>
                {props.text}
              </div>
              <div className='w-100 d-flex flex-row justify-content-between mb-3'>
                <div className='d-flex flex-column'>
                  <div className='p p--s'>
                    {props.name}
                  </div>
                  <div className='p p--s color-button-disabled-text'>
                    {props.organization} / {props.year}
                  </div>
                </div>
                <div
                  className='h2 font-weight-normal font-spectral'
                  style={{ lineHeight: 1 }}
                >
                  {(props.index || 0) + 1}/{page.previews.length}
                </div>
              </div>
            </div>
          }
        />
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <div className='h2 mb-xs mb-md-xs'>
                {page.archiveTitle}
              </div>
            </div>
          </div>
          {page.items.tickets.map((year: { year: number, items: Feedback[] }) =>
            <>
              <div className='row'>
                <div className='col'>
                  <div className='h3 mb-xxs mb-md-xs'>
                    {year.year}
                  </div>
                </div>
              </div>
              <div className='row'>
                {year.items.map((item: Feedback) =>
                  <>
                    <Link
                      to={item.url}
                      className='col-4 col-md-2 col-lg-3 mb-xs md-md-s'
                    >
                      <div className='p p--l'>
                        {item.name}
                      </div>
                      <div className='p p--xl font-spectral'>
                        {item.author}
                      </div>
                      <div className='p p--s color-button-disabled-text'>
                        {item.organization}
                      </div>
                    </Link>
                    <div className='pt-0 p-md-1 col-1' />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
  }
}


export default Reviews