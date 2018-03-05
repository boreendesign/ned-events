import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Script from 'react-load-script';
import Timestamp from 'react-timestamp';

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
    console.log(this.props);
    const { data } = this.props;
    const { edges: posts } = data.allEvents;

    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Neural Education Events</h1>
          </div>
          {posts.map(({ node: post }) => {
            post.path = (post.title).replace(/ /g,"_").toLowerCase()
            return (
                 <div className="content" style={{ border: '1px solid #eaecee', padding: '2em 4em' }} key={post.id}>
                   <p>
                       {post.title}
                     <span> &bull; </span>
                   <small><Timestamp time={post.event_start_date} format='date' />
                 {post.event_end_date != '' &&
                     <span> to <Timestamp time={post.event_end_date} format='date' /></span>
                 }


                  </small>
                   </p>
                   <p>
                     {post.body}

                   </p>
                   {post.link_location != '' &&
                      <a target = '_blank' className = "event_info" href ={post.link_location}>{post.link_text}</a>
                   }                   
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

`;
//(sort: { fields:"published_date"})
