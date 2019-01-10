import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import './container.scss';

class Container extends Component {
  render = () => {
    const { posts, categories } = this.props;
    const postList = posts.map((post, i) =>
      <article className="markdown-body post" key={i}>
        <ReactMarkdown source={post.content} />
      </article>
    );
    const categoryList = categories.map((category, i) =>
      <li key={i}>{category.label}</li>
    );
    return (
      <div className="container">
        <article className="post-collection">
          {postList}
        </article>
        <aside>
          <ul>
            {categoryList}
          </ul>
        </aside>
      </div>
    );
  };
}

Container.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createTime: PropTypes.string,
    postTime: PropTypes.string,
    updateTime: PropTypes.string,
    content: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  })),
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
}

export default connect()(Container);
