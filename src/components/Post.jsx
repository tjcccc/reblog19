import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

class Post extends Component {
  render = () => {
    const { data, key } = this.props;
    return (
      <article className="markdown-body post" key={key}>
        <ReactMarkdown source={data.content} />
        <hr />
        <p>{data.postTime}</p>
      </article>
    );
  };
}

Post.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createTime: PropTypes.string,
    postTime: PropTypes.string,
    updateTime: PropTypes.string,
    content: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  key: PropTypes.number
}

export default connect()(Post);
