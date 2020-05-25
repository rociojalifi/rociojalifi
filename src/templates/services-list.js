import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import ServicesItems from '../components/items-services'
import SectionTitle from '../components/sectiontitle'
import Pagination from '../components/pagination'
import SEO from '../components/seo'

class ServicesList extends React.Component {
  render() {
    const query = this.props.datas

    if (query.allMarkdownRemark.edges.length > 0) {
      return (
        <section id="services" className="container">
          <div className="section-title">
            <SectionTitle title="SERVICES" />
          </div>
          <ServicesItems data={query} />
          <Pagination pageContext={this.props.pageContext} type="services" />
        </section>
      )
    } else {
      return <React.Fragment></React.Fragment>
    }
  }
}

export default function({data, pageContext}) {
  return (
    <Layout>
      <SEO lang="en" title="Services" />
      <ServicesList datas={data} pageContext={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query servicesListPage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/services/"}}
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            date
            order
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
`
