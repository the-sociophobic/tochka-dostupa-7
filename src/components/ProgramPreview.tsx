import React from "react"

import FormattedMessage from '../components/FormattedMessage'
import Link from '../components/Link'


type Props = {
  program: string
}


class ProgramPreview extends React.Component<Props, {}> {
  render = () =>
    <div className="ProgramPreview">
      {this.props.program}
    </div>
}


export default ProgramPreview