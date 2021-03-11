import React from 'react'

import _ from 'lodash'
import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import enLocale from 'date-fns/locale/en-US'

import { Context } from '../../components/Store'
import DeviceInfo from '../../components/DeviceInfo'
import Login from '../Login'


class Settings extends React.Component<{}, {}> {
  
  static contextType = Context

  render = () =>
    _.isEmpty(this.context.user) ?
      <Login />
      :
      <div className="Settings">

        <div className="Settings__container">
          <h1 className="Settings__h1">
            {this.context.user.name} {this.context.user.surname}
          </h1>

          <div className="Settings__registered">
            Зарегистрирован {format(
              new Date(this.context.user.createdAt),
              'd MMM yyyy, HH:mm:ss',
              { locale: this.context.locale === "rus" ? ruLocale : enLocale }
            )}
          </div>

          <div className="Settings__sessions">
            {this.context.user.siteSession?.map((session: any) =>
              <div className="Settings__sessions__item">
                <div className="Settings__sessions__item__date">
                  {format(
                    new Date(session.createdAt),
                    'd MMM yyyy, HH:mm:ss',
                    { locale: this.context.locale === "rus" ? ruLocale : enLocale }
                  )}
                </div>
                <div className="Settings__sessions__item__device-info">
                  <DeviceInfo data={session.deviceInfo} />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
}


export default Settings