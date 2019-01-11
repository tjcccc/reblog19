import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../post/post.component';
import CategoryCollection from '../category-collection/category-collection.component';
import TagCollection from '../tag-collection/tag-collection.component';
import './container.scss';

class Container extends Component {
  render = () => {
    const { posts, categories, tags } = this.props;
    const postList = posts.map((post, index) =>
      <Post data={post} key={index} />
    );
    return (
      <div className="container">
        <article className="post-collection">
          {postList}
        </article>
        <aside>
          <CategoryCollection items={categories} />
          <TagCollection items={tags} />
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
    label: PropTypes.string,
    postCount: PropTypes.number
  })),
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    postCount: PropTypes.number
  }))
}

export default connect()(Container);
