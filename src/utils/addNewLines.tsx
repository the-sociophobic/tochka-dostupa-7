const addNewLines = (string: string, className?: string) =>
  <div className={`inherit-all ${className}`}>
    {string.includes('\n') ?
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
    }
  </div>


export default addNewLines