const {createFilePath} = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({node, getNode, basePath: `basepages`})
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions
  const typeDefs = `
      type Site implements Node {
        siteMetadata: SiteMetaData
      }
      type SiteMetaData {
        disqus: String
      }
    `
  createTypes(typeDefs)

  /*const { createTypes } = actions;
    const typeDefs = [
        `type Site implements Node { SiteMetadata: SiteMetaData }`,
        schema.buildObjectType({
            name: "SiteMetadata",
            fields: {
                name: "String!",
                firstName: "String!",
                email: "String!",
                receivedSwag: {
                    type: "Boolean",
                    resolve: source => source.receivedSwag || false
                }
            },
            interfaces: ["Node"]
        })
    ];*/
}

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return graphql(`
    {
      blog: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blog/"}}) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
          }
        }
      }
      services: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/services/"}}
      ) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
          }
        }
      }
      basepages: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/basepages/"}}
      ) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
          }
        }
      }
      limitPost: site {
        siteMetadata {
          blogItemsPerPage
          servicesItemsPerPage
        }
      }
    }
  `).then((result) => {
    const blogPosts = result.data.blog.edges

    const blogPostsPerPage = result.data.limitPost.siteMetadata.blogItemsPerPage
    const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage)

    Array.from({length: numBlogPages}).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve('./src/templates/blog-list.js'),
        context: {
          limit: blogPostsPerPage,
          skip: i * blogPostsPerPage,
          numPages: numBlogPages,
          currentPage: i + 1,
        },
      })
    })

    const ServicesItems = result.data.services.edges
    const ServicesItemsPerPage =
      result.data.limitPost.siteMetadata.servicesItemsPerPage
    const numServicesItems = Math.ceil(
      ServicesItems.length / ServicesItemsPerPage,
    )

    Array.from({length: numServicesItems}).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/services` : `/services/${i + 1}`,
        component: path.resolve('./src/templates/services-list.js'),
        context: {
          limit: blogPostsPerPage,
          skip: i * blogPostsPerPage,
          numPages: numServicesItems,
          currentPage: i + 1,
        },
      })
    })

    result.data.blog.edges.forEach(({node}) => {
      let template =
        node.frontmatter.template === undefined
          ? 'blog'
          : node.frontmatter.template
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/' + template + '.js'),
        context: {
          slug: node.fields.slug,
        },
      })
    })

    result.data.services.edges.forEach(({node}) => {
      let template =
        node.frontmatter.template === undefined
          ? 'services'
          : node.frontmatter.template
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/' + template + '.js'),
        context: {
          slug: node.fields.slug,
        },
      })
    })

    result.data.basepages.edges.forEach(({node}) => {
      let template =
        node.frontmatter.template === undefined
          ? 'basepage'
          : node.frontmatter.template
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/' + template + '.js'),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}
