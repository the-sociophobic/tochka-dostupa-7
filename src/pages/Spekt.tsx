import React from 'react'

import { Spekt as SpektType } from '../components/Store/Types'
import {
  Online,
  Offline,
  Age
} from '../components/buttons'
import Dropdown from '../components/Dropdown'

// interface SpektProps extends SpektType {

// }


class Spekt extends React.Component<{}, {}> {

  render = () =>
    <div className='Spekt'>
      <div className='container'>

        <div className='row mt-s d-flex flex-column flex-lg-row mb-s mb-md-m mb-lg-l'>
          <div className='col-4 col-md-6 col-lg-8 order-lg-2'>
            <img
              src='https://sun9-38.userapi.com/impg/x5Vv35JA32ZDqsWAJ1nlXXGuufT7htWKpSEKOQ/5VoRJ4pO_Xo.jpg?size=1720x1040&quality=96&sign=5e78f6af7cf81174d8ad47add0bd4141&type=album'
              className='w-100 h-auto'
            />
          </div>

          <div className='col-4 col-md-6 col-lg-4 mt-s d-flex flex-column'>
            <h1 className='h1 mb-1'>
              Пожалуйста, дальше (гамлет)
            </h1>
            <div className='h1 font-spectral mb-xs'>
              Ян Дюйвендак
            </div>
            <div className='d-flex flex-row'>
              <Online className='mr-1' />
              <Offline className='mr-1' />
              <Age number={18} />
            </div>
          </div>
        </div>


        <div className='row mb-m mb-md-l mb-lg-xl'>
          <div className='col-4 col-md-6 col-lg-4'>
            <div className='row d-flex flex-row flex-lg-column'>
              <div className='col-4 col-md-2 col-lg-12'>
                <div className='p p--s'>
                  Продолжительность
                </div>
                <h3 className='h3 h3--l mb-s'>
                  2 часа без антракта
                </h3>
              </div>
              <div className='col-4 col-md-2 col-lg-12'>
                <div className='p p--s'>
                  Локация / платформа
                </div>
                <h3 className='h3 h3--l mb-s'>
                  Большая Морская ул., 24, Дом Композиторов
                  <br />
                  Приложение Zoom
                </h3>
              </div>
              <div className='col-4 col-md-2 col-lg-12'>
                <div className='p p--s'>
                  При поддержке
                </div>
              </div>
            </div>
          </div>

          <div className='col-4 col-md-6 col-lg-8'>
            <div className='p p--l mb-m mb-lg-l'>
              Что мы знаем о сотрудниках колл-центров? Кто находится на другом конце телефонной линии? Как выглядят эти невидимые люди? 
              <br /><br />
              Более 12 лет назад Rimini Protokoll организовал перформативную встречу one-to-one между сотрудником индийского колл-центра и посетителем европейского театра. Каждый зритель оказывался в комнате наедине с телефоном и вступал в диалог с незнакомцем. Деловой разговор с каждой минутой становился все более частным и интимным.
            </div>

            <Dropdown
              className='Dropdown--spekt mb-2 mb-md-3 px-3 px-md-4'
              title={<h3 className='h3 mb-0'>Купить билет</h3>}
              initialOpen={true}
            >
              {[
                {
                  dateTime: '17.06 / Понедельник / 17:00 мск',
                  offline: false,
                },
                {
                  dateTime: '18.06 / Вторник / 17:00 мск',
                  offline: true,
                },
                {
                  dateTime: '19.06 / Среда / 17:00 мск',
                  offline: false,
                },
                {
                  dateTime: '17.06 / Понедельник / 17:00 мск',
                  offline: false,
                },
              ].map(show =>
                <div className='Spekt__show'>
                  <div className='Spekt__show__date-time'>
                    {show.dateTime}
                  </div>
                  <div className='Spekt__show__line'>
                    {show.offline ? <Offline /> : <Online />}
                  </div>
                  <div className='Spekt__show__buy'>
                    Купить билет
                  </div>
                </div>
              )}
            </Dropdown>
            <Dropdown
              className='Dropdown--spekt mb-2 mb-md-3 px-3 px-md-4'
              title={<h3 className='h3 mb-0'>Как это будет онлайн?</h3>}
              initialOpen={true}
            >
              <div className='p p--l'>
                Что мы знаем о сотрудниках колл-центров? Кто находится на другом конце телефонной линии? Как выглядят эти невидимые люди? 
                <br /><br />
                Более 12 лет назад Rimini Protokoll организовал перформативную встречу one-to-one между сотрудником индийского колл-центра и посетителем европейского театра. Каждый зритель оказывался в комнате наедине с телефоном и вступал в диалог с незнакомцем. Деловой разговор с каждой минутой становился все более частным и интимным.
              </div>
            </Dropdown>
            <Dropdown
              className='Dropdown--spekt mb-2 mb-md-3 px-3 px-md-4'
              title={<h3 className='h3 mb-0'>Как это будет онлайн?</h3>}
            >

            </Dropdown>
            <Dropdown
              className='Dropdown--spekt px-3 px-md-4'
              title={<h3 className='h3 mb-0'>Инструкция для зрителей</h3>}
            >

            </Dropdown>
          </div>
        </div>

      </div>
    </div>
}


export default Spekt