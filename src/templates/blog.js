import React from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import LatestPosts from '../components/blogposts-latest'
import SEO from '../components/seo'
import Date from '../components/date'
import Comments from '../components/comments'
import '../style/blog-singlepage.less'

export default function({data, location}) {
  return (
    <Layout>
      <SEO
        lang="en"
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description}
        image={data.markdownRemark.frontmatter.image.publicURL}
      />
      <div className="container">
        <article className="blog-post">
          {data.markdownRemark.frontmatter.published ? null : (
            <div
              style={{
                border: '2px solid red',
                marginBottom: 20,
                padding: 10,
                backgroundColor: 'rgba(220, 24, 240, 0.1)',
              }}
            >
              <strong>Unpublished Post!</strong>{' '}
              <small>
                This URL is public but secret which I will publish in the
                future. Please do not share it yet.
              </small>
            </div>
          )}
          {data.markdownRemark.frontmatter.banner != null && (
            <div className="banner">
              <Img
                fluid={
                  data.markdownRemark.frontmatter.banner.childImageSharp.fluid
                }
              />
            </div>
          )}
          <div className="head text-primary">
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <p className="post-date">
              <Date data={data.markdownRemark.frontmatter.date} />
            </p>
          </div>
          <div className="content row flex">
            <div
              className="col s12 m11 l10"
              dangerouslySetInnerHTML={{
                __html: data.markdownRemark.html,
              }}
            ></div>
          </div>
        </article>
        <Comments
          title={data.markdownRemark.frontmatter.title}
          location={location.pathname}
        />
        <LatestPosts id={data.markdownRemark.id} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      id
      frontmatter {
        title
        date
        description
        published
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1000) {
              srcSet
              ...GatsbyImageSharpFluid
            }
          }
        }
        banner {
          publicURL
          childImageSharp {
            fluid(maxHeight: 600, maxWidth: 1920) {
              srcSet
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
