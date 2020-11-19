import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
// import logger from '../utilities/logger';
// import terms from '../config/terms';

class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { about } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>About</title>
        </Helmet>
        <article className="markdown-body post">
          <ReactMarkdown source={about} />
        </article>
      </div>
    );
  };
}

AboutPage.displayName = "AboutPage";

AboutPage.propTypes = {
  // blogName: PropTypes.string,
  // authorName: PropTypes.string,
  about: PropTypes.string
};

const mapStateToProps = (state) => ({
  // blogName: state.config.blogName,
  // authorName: state.config.authorName,
  about: state.config.about
});

export default connect(mapStateToProps, null)(AboutPage);
