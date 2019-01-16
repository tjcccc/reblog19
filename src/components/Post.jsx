import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faShare } from '@fortawesome/free-solid-svg-icons'
import terms from '../config/terms';

class Post extends Component {
  render = () => {
    const { data, isCompact ,key } = this.props;
    const postPanelCompact = (
      <section className='post-panel'>
        <section className='post-info'>
          <label>{terms.postUpdateTimeLabel}</label>
          <span>{data.updateTime}</span>
          <label>{terms.viewCountLabel}</label>
          <span>{data.viewCount}</span>
        </section>
        <section className='post-actions'>
          <a href='/'>
            <FontAwesomeIcon icon={faShare} fixedWidth />
            <span>{terms.shareLabel}</span>
          </a>
          <a href='/'>
            <FontAwesomeIcon icon={faEdit} fixedWidth />
            <span>{terms.editLabel}</span>
          </a>
        </section>
      </section>
    );
    const postPanel = isCompact ? postPanelCompact : (<p>Comments could be placed here.</p>);
    return (
      <article className='markdown-body post' key={key}>
        <ReactMarkdown source={data.content} />
        {postPanel}
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
    tags: PropTypes.arrayOf(PropTypes.string),
    viewCount: PropTypes.number
  }),
  isCompact: PropTypes.bool,
  key: PropTypes.number
}

export default connect()(Post);
