import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import Link from '../components/Link'
import Img from '../components/Img'
import {
  Online,
  Offline,
  Age,
  Left,
  Right
} from '../components/buttons'
import { Context } from './Store'

import camelize from '../utils/camelize'


type Props = {
  program: string | any
}

type State = {
  containerWidth: number
}


const items = [
  {
    name: ["Игрушки Люшера. Психотерапевтическая утопия", "Lusher Toys"],
    makers: [["Артём Арсенян", "Artyom Arsenyan"], ["Коля Филиппов", "Nick Filippov"], ["Филипп Вулах", "Filipp Vulakh"], ["Ольга Аршанская", "Olga Arshanskaya"], ["Леф Васильев", "Lef Vasilyev"]],
    shortDesc: [
      "Краткое описание в две-три строки. Краткое описание в две-три строки. Краткое описание в две-три строки. А может быть и в четыре строки, если вообще не понятно что это такое",
      "Short desc, 2-3 lines blah blah blah СВОБОДУ ПОЛИТЗАКЛЮЧËННЫМ"
    ],
    offline: true,
    online: true,
    age: 18,
    cover: "https://sun9-27.userapi.com/impf/pTfeNZgqsvqoWdJl5rvbGIJ1uhgLOL6GkvTLYQ/lrj6gocSr8E.jpg?size=1174x712&quality=96&sign=9e4e041ec0e1f0037e52e848f6cea2cb&type=album"
  },
  {
    name: ["Пожалуйста, дальше (Гамлет)", "Please continue (Hamlet"],
    makers: [["Илья Мощицкий", "Ilya Moschitsky"], ["Антон Томилин", "Anton Tomilin"]],
    shortDesc: [
      "a a a a a",
      "0 o 0 o 0"
    ],
    offline: true,
    online: true,
    age: 16,
    cover: "https://sun9-72.userapi.com/impf/q9M4iZesQriML4OC8_fHowIInjlzy-IM0kDYRQ/lin_ihJTt2E.jpg?size=1174x712&quality=96&sign=88113f9774c002b06b05c492e6111bbc&type=album"
  },
  {
    name: ["Игрушки Люшера. Психотерапевтическая утопия", "Lusher Toys"],
    makers: [["Артём Арсенян", "Artyom Arsenyan"], ["Коля Филиппов", "Nick Filippov"], ["Филипп Вулах", "Filipp Vulakh"], ["Ольга Аршанская", "Olga Arshanskaya"], ["Леф Васильев", "Lef Vasilyev"]],
    shortDesc: [
      "Краткое описание в две-три строки. Краткое описание в две-три строки. Краткое описание в две-три строки. А может быть и в четыре строки, если вообще не понятно что это такое",
      "Short desc, 2-3 lines blah blah blah СВОБОДУ ПОЛИТЗАКЛЮЧËННЫМ"
    ],
    offline: true,
    online: true,
    age: 18,
    cover: "https://sun9-27.userapi.com/impf/pTfeNZgqsvqoWdJl5rvbGIJ1uhgLOL6GkvTLYQ/lrj6gocSr8E.jpg?size=1174x712&quality=96&sign=9e4e041ec0e1f0037e52e848f6cea2cb&type=album"
  },
].map(item => ({
  ...item,
  link: `/spekt/${item.name[1].replace(/ /g, '-').replace(/\(|\)/g, '')}`,
  makers: item.makers.map(maker => ({
    name: maker,
    link: `/person/${maker[1].replace(/ /g, '-')}`
  }))
}))


class ProgramPreview extends React.Component<Props, State> {
  state = {
    containerWidth: 0
  }

  static contextType = Context

  resizeObs : any
  containerRef : any = React.createRef()

  componentDidMount = () =>
    this.resizeObs = new ResizeObserver(
      () =>
        this.setState({
          containerWidth: this.containerRef?.current?.offsetWidth
        }))
      .observe(this.containerRef.current)

  getLocale = (array : string[]) =>
    array[this.context.locale === 'rus' ? 0 : 1]

  renderArrows = (className?: string) =>
    <div className={className}>
      <Left />
      <Right />
    </div>


  render = () =>
    <div className={`ProgramPreview ProgramPreview--${this.props.program}`}>
      <div
        className="container"
        ref={this.containerRef}
      >
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-row underline">
              <h2 className="h2 mr-auto">
                <FormattedMessage id={
                  `Program.${camelize(this.props.program)}.name`
                } /> <FormattedMessage id='Program.name' />
              </h2>
              {this.renderArrows('d-none d-md-inline-block')}
            </div>
          </div>
        </div>
      </div>

      <div className='row d-md-none'>
        <div className='col-4'>
          {this.renderArrows()}
        </div>
      </div>

      <div className="ProgramPreview__items__scroll-container">
        <div className="ProgramPreview__items__container">
          {items.map(item =>
            <Link
              to={item.link}
              className='ProgramPreview__item'
            >
              <div
                // to={item.link}
                className="ProgramPreview__item__name"
              >
                {this.getLocale(item.name)}
              </div>
              <div className="ProgramPreview__item__makers">
                {item.makers.map(maker =>
                  <div
                    // to={maker.link}
                    className="ProgramPreview__item__makers__item"
                  >
                    {this.getLocale(maker.name).split(' ')[0]}&nbsp;{this.getLocale(maker.name).split(' ')[1]}
                  </div>
                )
                .reduce((a, b) => <>{a}, {b}</>)}
              </div>
              <div className="ProgramPreview__item__short-desc">
                {this.getLocale(item.shortDesc)}
              </div>

              <div className="ProgramPreview__item__buttons">
                {item.offline && <Offline />}
                {item.online && <Online />}
                {item.age && <Age number={item.age} />}
              </div>

              <Img
                src={item.cover}
                className="ProgramPreview__item__cover"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="container mt-xxs mt-md-xs">
        <div className="row">
          <div className="col-4 col-md-6 col-lg-4 col-xl-3">
            <Link
              to={`/${this.props.program}`}
              className='button button--main'
            >
              <FormattedMessage id='Program.full' />
            </Link>
          </div>
        </div>
      </div>
    </div>
}


export default ProgramPreview