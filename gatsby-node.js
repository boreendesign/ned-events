const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
//sort: {fields: [published_date], order: ASC}
  return graphql(`
    {
      allEvents(sort: {fields: [event_start_date], order: ASC}) {
            edges {
              node {
                body,
                id,
                title,
                published_date,
                event_start_date,
                event_end_date,
                link_text,
                link_location                
              }
            }
          }
    }
  `)
  .then(result => {
    console.log('node');
    console.log(result.data);
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }
    result.data.allStories.edges.forEach(({ node }) => {
      createPage({
        path: (node.title).replace(/ /g,"_").toLowerCase(),
        component: path.resolve(`src/templates/${String(node.page_type)}.js`),
        context: {
          title:node.title,
          published_date:node.published_date

        } // additional data can be passed via context
      });
    });
  });
};
