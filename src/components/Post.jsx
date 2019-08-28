import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { FaBookOpen, FaShare, FaEdit } from 'react-icons/fa'
import terms from '../config/terms';

class Post extends Component {
  render = () => {
    const { data, isCompact, key, isAdmin } = this.props;

    const post = {
      id: data._id,
      title: data.title,
      createTime: data.create_time,
      postTime: data.post_time,
      updateTime: data.update_time,
      content: data.content,
      category_ids: data.categoriy_ids,
      tag_ids: data.tag_ids,
      viewCount: data.view_count
    }

    const postPath = `/post/${post.id}`;

    const adminActions = isAdmin ? (
      <a href={`/post/${post.id}/edit`}>
        <FaEdit />
        <span>{terms.label.edit}</span>
      </a>
    ) : undefined;
    const postPanelCompact = (
      <section className='post-panel'>
        <section className='post-info'>
          <div>
            <label>{terms.label.postUpdateTime}</label>
            <span>{post.updateTime}</span>
          </div>
        </section>
        <section className='post-actions'>
          <a href={postPath}>
            <FaBookOpen />
            <span>{terms.label.read}</span>
          </a>
          {adminActions}
        </section>
      </section>
    );
    const postPanelFull = (
      <section className='post-panel'>
        <section className='post-info'>
          <div>
            <label>{terms.label.postUpdateTime}</label>
            <span>{post.updateTime}</span>
          </div>
          <div>
            <label>{terms.label.viewCount}</label>
            <span>{post.viewCount}</span>
          </div>
          <div>
            <label>{terms.label.commentCount}</label>
            <span>{0}</span>
          </div>
        </section>
        <section className='post-actions'>
          <a href='/'>
            <FaShare />
            <span>{terms.label.share}</span>
          </a>
          {adminActions}
        </section>
      </section>
    );

    const postPanel = isCompact ? postPanelCompact : postPanelFull;

    return (
      <article className='markdown-body post' key={key}>
        <ReactMarkdown source={post.content} />
        {postPanel}
      </article>
    );
  };
}

Post.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    create_time: PropTypes.string,
    post_time: PropTypes.string,
    update_time: PropTypes.string,
    content: PropTypes.string,
    category_ids: PropTypes.arrayOf(PropTypes.string),
    tag_ids: PropTypes.arrayOf(PropTypes.string),
    view_count: PropTypes.number
  }),
  isCompact: PropTypes.bool,
  key: PropTypes.number,
  isAdmin: PropTypes.bool
}

const mapStateToProps = state => ({
  isAdmin: state.authorization.isAdmin
});

export default connect(mapStateToProps, null)(Post);
