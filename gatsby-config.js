module.exports = {
  plugins: [
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
        // postCssPlugins: [require('sass-loader'), require('postcss-loader')],
        sassOptions: {
          indentedSyntax: true,
          includePaths: [require("path").resolve(__dirname, "node_modules")],
          precision: 6,
        }
      },
    },
    {
        resolve: `gatsby-plugin-react-svg`,
        options: {
          rule: {
            include: /src\/styles\/img/
          }
        }
      },
  ]
}