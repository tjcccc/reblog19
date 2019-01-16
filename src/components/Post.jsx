import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

class Post extends Component {
  render = () => {
    const { data, isCompact ,key } = this.props;
    const postOptions = isCompact ? (<p>aaa</p>) : (<p>Comments could be placed here.</p>);
    return (
      <article className='markdown-body post' key={key}>
        <ReactMarkdown source={data.content} />
        <section>
          Update Time: {data.updateTime}
          {postOptions}
        </section>
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
  isCompact: PropTypes.bool,
  key: PropTypes.number
}

export default connect()(Post);
