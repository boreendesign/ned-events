module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "UA-91364304-4",
          // Setting this parameter is optional
          anonymize: true,
        }
      },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-firebase`,
      options: {
        // point to the firebase private key downloaded
        credential: require("./firebase-key.json"),

        // your firebase database root url
        databaseURL: "https://ned-events.firebaseio.com",

        // you can have multiple "types" that point to different paths
        types: [
          //{
            // this type will become `allWorkshop` in graphql
            //type: "Story",

            // the path to get the records from
            //path: "posts",

            // probably don't want your entire database, use the query option
            // to limit however you'd like
            //query: ref => ref.limitToLast(10),

            // This allows you to map your data to data that GraphQL likes:
            // 1. Turn your lists into actual arrays
            // 2. Fix keys that GraphQL hates. It doesn't allow number keys
            //    like "0", you'll get this error pretty often:
            //    Error: Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but "0" does not
            // 3. Remove stuff you don't need.
            //
            // Feel free to mutate, we sent you a copy anyway.
            /*map: node => {
              // fix keys graphql hates
              node.nineteenEightyFive = node['1985']
              delete node['1985']

              // convert a child list to an array:
              return node.sessions = Object.keys(node.sessions).map(key => {
                return { _key: key, session: node.sessions[key] }
              })

              // finally, return the node
              return node
            },*/
          //},

          // if you're data is really simple, this should be fine too
          {
            type: "Events",
            path: "posts",
          }
        ]
      }
    }
  ]
};
