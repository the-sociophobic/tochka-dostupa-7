const addNewLines = (string: string, className?: string) =>
  <div className={className}>
    {typeof string === "string" ?
      string
        .split('\n')
        .map(paragraph => <>{paragraph}</>)
        // .reduce((a, b) =>
        //   <>
        //     {a}<br />{b}
        //   </>)
      :
      string
    }
  </div>


export default addNewLines