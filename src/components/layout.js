import React from 'react'
import Head from './head'
import Navbar from './navbar'
import Footer from './footer'
import FooterSimple from './footer-simple'

const Layout = ({placeholder, children, simpleFooter = false}) => {
  return (
    <React.Fragment>
      <Head />
      <Navbar placeholder={placeholder === undefined ? true : placeholder} />
      <div className="wrapper">{children}</div>
      {simpleFooter ? <FooterSimple /> : <Footer />}
    </React.Fragment>
  )
}

export default Layout
