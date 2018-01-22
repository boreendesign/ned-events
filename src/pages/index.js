import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Script from 'react-load-script';

export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allStories;

    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Upcoming Neural Education Events</h1>
          </div>
          {posts.map(({ node: post }) => {
            post.path = (post.title).replace(/ /g,"_").toLowerCase()
            return (
                 <div className="content" style={{ border: '1px solid #eaecee', padding: '2em 4em' }} key={post.id}>
                   <p>
                     <Link className="has-text-primary" to={post.path}>
                       {post.title}
                     </Link>
                     <span> &bull; </span>
                     <small>{post.published_date}</small>
                   </p>
                   <p>
                     {post.summary}
                     <br />
                     <br />
                     <Link className="button is-small" to={post.path}>
                       Contact Us About this event
                     </Link>
                   </p>
                 </div>
               );


          })}
        </div>
      </section>
    );
  }
}


export const pageQuery = graphql`
  query IndexQuery {
    allStories(sort: {fields: [published_date], order: ASC}) {
          edges {
            node {
              body,
              id,
              title,
              published_date,
              summary
            }
          }
        }
    }

`;
//(sort: { fields:"published_date"})