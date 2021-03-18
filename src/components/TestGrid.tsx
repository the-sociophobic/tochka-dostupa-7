import React from 'react'

const TestGrid : React.FunctionComponent = ({}) =>
  <div className="container">
    <div className="row">
      <div className="col-1">
        <div className="w-100 border p--s">
          1
        </div>
      </div>
      <div className="col-1">
        <div className="w-100 border p--s">
          2
        </div>
      </div>
      <div className="col-1">
        <div className="w-100 border p--s">
          3
        </div>
      </div>
      <div className="col-1">
        <div className="w-100 border p--s">
          4
        </div>
      </div>
      <div className="col-1 d-none d-md-block">
        <div className="w-100 border p--s">
          5
          <br />
          d-md-block
        </div>
      </div>
      <div className="col-1 d-none d-md-block">
        <div className="w-100 border p--s">
          6
        </div>
      </div>
      <div className="col-1 d-none d-lg-block">
        <div className="w-100 border p--s">
          7
        </div>
      </div>
      <div className="col-1 d-none d-lg-block">
        <div className="w-100 border p--s">
          8<br />
          d-lg-block
        </div>
      </div>
      <div className="col-1 d-none d-lg-block">
        <div className="w-100 border p--s">
          9
        </div>
      </div>
      <div className="col-1 d-none d-lg-block">
        <div className="w-100 border p--s">
          10
        </div>
      </div>
      <div className="col-1 d-none d-lg-block">
        <div className="w-100 border p--s">
          11
        </div>
      </div>
      <div className="col-1 d-none d-lg-block">
        <div className="w-100 border p--s">
          12
        </div>
      </div>
    </div>
  </div>


export default TestGrid