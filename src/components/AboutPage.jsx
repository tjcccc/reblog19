import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import about from '../mock/about';
// import logger from '../utilities/logger';
// import terms from '../config/terms';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutBlog: about.blog,
      aboutAuthor: about.author
    }
  }

  render = () => {
    const { aboutBlog, aboutAuthor } = this.state;

    return (
      <div className='container'>
        <Helmet>
          <title>About</title>
        </Helmet>
        <article className='markdown-body post'>
          <ReactMarkdown source={aboutBlog} />
        </article>
        <br />
        <br />
        <br />
        <br />
        <article className='markdown-body post'>
          <ReactMarkdown source={aboutAuthor} />
        </article>
      </div>
    );
  };

}

AboutPage.displayName = 'AboutPage';

export default connect()(AboutPage);
