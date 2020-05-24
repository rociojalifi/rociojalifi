import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import ServicesItems from './items-services'

export default function() {
  const query = useStaticQuery(graphql`
    query servicesList {
      allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/services/"}}
        limit: 6
        sort: {fields: [frontmatter___date], order: DESC}
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              description
              image {
                publicURL
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    srcSet
                    ...GatsbyImageSharpFluid
                  }
                  id
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <section id="services" className="container">
      <ServicesItems data={query} />
    </section>
  )
}
