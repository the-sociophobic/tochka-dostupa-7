import React from 'react'

import _ from 'lodash'

import modelsDesc from '../../../components/Store/models'
import { Context } from '../../../components/Store'
// import { post } from '../../../utils/API'
import { newInstance } from '../../../utils/modelUtils'
import Loading from '../Loading'
import Login from '../../Login'
import HorizontalShowcase from '../../../components/HorizontalShowcase'
import Editor from './Editor'


class Admin extends React.Component<{}, {}> {
  
  state = {
    loading: false,
    currentEditable: null,
    currentModel: null,
  }

  static contextType = Context

  asyncWrapper = async (fn: Function) => {
    this.setState({ loading: true })
    this.context.openPopup()
    await fn()
    this.setState({ loading: false })
    this.context.closePopup()
  }

  downloadAll = async () => {

  }

  composeEditable = (Comp: any, model: Object) => {
    const Editable: React.FunctionComponent<any> =
      (props: any) => {
        console.log(props)

        return <Comp
          linkDisabled={true}
          onClick={() => this.setState({ currentEditable: props })}
          model={model}
          {...props}
        />
      }
  
    return Editable
  }
  
  render = () =>
    _.isEmpty(this.context.user) ?
      <Login />
      :
      <div className="Admin">
        <div className="container">

          {/* <div className='row'>
            <div className='col-3'>
              <button
                className='button button--main'
                onClick={() => this.downloadAll()}
              >
                Выгрузить все данные
              </button>
            </div>
          </div> */}


        {/* {(() =>
          console.log([
            newInstance(modelsDesc[0].model),
            ...(this.context[modelsDesc[0].name + 's'])
          ]))()} */}
        {modelsDesc.map(modelDesc =>
          <HorizontalShowcase
            S
            items={[
              newInstance(modelDesc.model),
              ...(this.context[modelDesc.name + 's'])
            ]}
            ItemComp={this.composeEditable(modelDesc.Card, modelDesc.model)}
            title={modelDesc.label}
          />
        )}

        {this.state.currentEditable &&
          <Editor
            obj={this.state.currentEditable}
            model={this.state.currentModel}
          />
        }

        {this.state.loading && <Loading />}
      </div>
    </div>
}


export default Admin