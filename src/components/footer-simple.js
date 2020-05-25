import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import '../style/footer.less'

export default function() {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <footer className="footer">
      <div className="container">
        <p className="text-primary f-d">
          Copyright &copy; {query.site.siteMetadata.title}{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
