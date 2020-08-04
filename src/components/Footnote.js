import React from 'react'

import '../style/footnote.less'

const Footnote = ({idName, children}) => {
  return (
    <span class="footnote">
      <label for={idName} className="margin-toggle sidenote-number"></label>
      <input type="checkbox" id={idName} className="margin-toggle" />
      <span className="sidenote">{children}</span>
    </span>
  )
}

export default Footnote
