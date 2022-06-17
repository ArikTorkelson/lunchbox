module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'Lunchbox',
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: '1UTRfSb-ddPB0qtqQmT5-TEyCZVMOIjWdGsbmM3fdwU',
        spaceId: '5ywyur77omkg',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/android-chrome-512x512.png',
      },
    },
  ],
};
