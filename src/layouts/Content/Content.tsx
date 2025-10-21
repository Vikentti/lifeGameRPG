import './Content.scss'
import classNames from 'classnames'
import React from "react";

function Content({children} : {children : React.ReactNode}) {
  return (
    <main
      className="container"
    >
      {children}
    </main>
  )
}

export default Content