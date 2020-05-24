const siteMetadata = {
  title: `Rocio Jalifi`,
  siteUrl: `http://localhost`,
  capitalizeTitleOnHome: true,
  logo: `/images/avatar.png`,
  icon: `/images/icon.png`,
  titleImage: `/images/wall.jpg`,
  introTag: `NUTRITIONIST | VLOGGER`,
  description: `Le kittem comes to make you vegan!`,
  author: `@rojalifi`,
  blogItemsPerPage: 10,
  portfolioItemsPerPage: 10,
  darkmode: false,
  switchTheme: true,
  navLinks: [
    {name: 'HOME', url: '/'},
    {name: 'ABOUT', url: '/about'},
    {name: 'BLOG', url: '/blog'},
    {name: 'PORTFOLIO', url: '/portfolio'},
    {name: 'CONTACT', url: '/contact'},
  ],
  footerLinks: [{name: 'PRIVACY POLICY', url: '/privacy-policy'}],
  social: [
    {
      name: 'Twitter',
      icon: '/images/Twitter.svg',
      url: 'https://twitter.com/rojalifi',
    },
    {
      name: 'Instagram',
      icon: '/images/Instagram.svg',
      url: 'https://www.instagram.com/thisisroci',
    },
    {
      name: 'Youtube',
      icon: '/images/Youtube.svg',
      url: 'https://www.youtube.com/channel/UC2pcOYosYqUODla4Wxy1QrA',
    },
  ],
  contact: {
    // Leave the below value completely empty (no space either) if you don't want a contact form.
    // api_url: './test.json',
    api_url: '',
    description: '...',
    mail: 'hi@mail.com',
    phone: '123-456-7890',
    address: '1234 \nLocation \nLocation',
  },
  // this is optional. you can uncomment this if you use disqus
  // disqus: `your-disqus-shortname`
}

const plugins = [
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        'gatsby-remark-copy-linked-files',
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1280,
          },
        },
      ],
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'contents',
      path: `${__dirname}/contents/`,
    },
  },
  {
    resolve: 'gatsby-plugin-less',
    options: {
      strictMath: true,
    },
  },
]

if (siteMetadata.disqus) {
  plugins.push({
    resolve: 'gatsby-plugin-disqus',
    options: {
      shortname: siteMetadata.disqus,
    },
  })
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: plugins,
}
