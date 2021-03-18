const addNewLines = (string: string | any) =>
  typeof string !== 'string' ?
    string
    :
    string.includes('\n') ?
      string
        .split('\n')
        .map((paragraph, index) =>
          <div
            key={index}
            className="inherit-all"
          >
            {paragraph}
          </div>)
      :
      string


export default addNewLines