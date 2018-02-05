import React from 'react';
import Helmet from 'react-helmet';

export default function Template({ data }) {
  const { node: post } = data.allEvents.edges[0];
  return (
    <section className="section">
      <Helmet title={`Blog | ${post.title}`} />
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export const pageQuery = graphql`
  query GetStory($title: String!){
    allEvents( filter: { title: { eq:$title} } ){
      edges{
        node{
          body,
          title
        }
      }
    }
  }
`;
