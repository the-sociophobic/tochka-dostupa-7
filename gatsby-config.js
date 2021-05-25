module.exports = {
    plugins: [
        `gatsby-plugin-layout`,
        {
          resolve: `gatsby-plugin-sass`,
          options: {
            implementation: require('sass'),
            sassOptions: {
              indentedSyntax: true,
              includePaths: ['src/scss', '~bootstrap/scss'],
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