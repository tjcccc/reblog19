import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import converter from '../utilities/converter';

class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { newTag: '' }
  }

  getLocalDate = converter.getLocalDate;

  render = () => {
    const { key, data } = this.props;

    const post = {
      id: data._id,
      title: data.title,
      postTime: data.post_time
    }

    return (
      <li key={key}>
        <a href={`/post/${post.id}`}>
          <h3>{post.title}</h3>
        </a>
        <span className='date'>{this.getLocalDate(post.postTime)}</span>
      </li>
    );
  }
}

PostListItem.propTypes = {
  key: PropTypes.number,
  data: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    create_time: PropTypes.string,
    post_time: PropTypes.string,
    update_time: PropTypes.string
  })
}

PostListItem.displayName = 'PostListItem';

export default connect()(PostListItem);
