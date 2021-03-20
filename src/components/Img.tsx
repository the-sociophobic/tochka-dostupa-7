import React from 'react'

import ResizeObserver from 'resize-observer-polyfill'


type Props = {
  src: string
  className?: string
}

type State = {
  portrait: boolean | undefined,
  containerRatio: number,
}


class Img extends React.Component<Props, State> {
  state = {
    portrait: undefined,
    containerRatio: 0,
  }

  imgRef: any = React.createRef()
  containerRef: any = React.createRef()
  resizeObs: any

  componentDidMount = () =>
    this.resizeObs = new ResizeObserver(this.setOrientation.bind(this))
      .observe(this.containerRef.current)

  setOrientation = () =>
    this.setState({
      portrait: this.containerRef?.current?.offsetWidth / this.containerRef?.current?.offsetHeight >
        this.imgRef?.current?.width / this.imgRef?.current?.height
    })

  render = () =>
    <div
      ref={this.containerRef}
      className={`
        Img
        ${this.props.className}
        ${typeof this.state.portrait === "undefined" && "Img--hidden"}
      `}
    >
      <img
        ref={this.imgRef}
        alt=""
        src={this.props.src}
        className={`Img__img Img__img--${this.state.portrait ? "portrait" : "landscape"}`}
        onLoad={this.setOrientation}
      />
    </div>
}


export default Img