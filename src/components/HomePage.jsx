import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import Post from './Post';
import CategoryCollection from './CategoryCollection';
import TagCollection from './TagCollection';
import terms from '../config/terms';

class HomePage extends Component {
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
          <p>
            <FontAwesomeIcon icon={faRss} fixedWidth />
            <span><a href='/'>{terms.subscribeLabel}</a></span>
          </p>
        </aside>
      </div>
    );
  };
}

HomePage.propTypes = {
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

export default connect()(HomePage);
