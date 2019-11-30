import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
// import { FaBookOpen, FaShare, FaEdit } from 'react-icons/fa';
import { FaBookOpen, FaEdit } from 'react-icons/fa';
import converter from '../utilities/converter';
import terms from '../config/terms';
import { hostBasename } from '../server-config';

class Post extends Component {
  getLocalDate = converter.getLocalDate;

  render = () => {
    const { data, isCompact, key, isAdmin } = this.props;

    const post = {
      id: data._id,
      title: data.title,
      createTime: data.create_time,
      postTime: data.post_time,
      updateTime: data.update_time,
      content: data.content,
      category_ids: data.category_ids,
      tag_ids: data.tag_ids,
      viewCount: data.view_count
    }

    const postPath = `/post/${post.id}`;

    // const updateTime = this.getLocalDate(post.updateTime);
    const localPostTime = this.getLocalDate(post.postTime);

    const adminActions = isAdmin ? (
      <Link to={`/post/${post.id}/edit`}>
        <FaEdit />
        <span>{terms.label.edit}</span>
      </Link>
    ) : undefined;
    const postPanelCompact = (
      <section className='post-panel'>
        <section className='post-info'>
          <div>
            <label>{terms.label.customPostTime}</label>
            <span>{localPostTime}</span>
          </div>
        </section>
        <section className='post-actions'>
          <Link to={postPath}>
            <FaBookOpen />
            <span>{terms.label.read}</span>
          </Link>
          {adminActions}
        </section>
      </section>
    );
    const postPanelFull = (
      <section className='post-panel'>
        <section className='post-info'>
          <div>
            <label>{terms.label.customPostTime}</label>
            <span>{localPostTime}</span>
          </div>
          {/* <div>
            <label>{terms.label.viewCount}</label>
            <span>{post.viewCount}</span>
          </div>
          <div>
            <label>{terms.label.commentCount}</label>
            <span>{0}</span>
          </div> */}
        </section>
        <section className='post-actions'>
          {/* <a href='/'>
            <FaShare />
            <span>{terms.label.share}</span>
          </a> */}
          {adminActions}
        </section>
      </section>
    );

    const postPanel = isCompact ? postPanelCompact : postPanelFull;

    const flatten = (text, child) => {
      return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text)
    }

    // Add id tag to '#' heading.
    const headingRenderer = (props) => {
      const children = React.Children.toArray(props.children)
      const text = children.reduce(flatten, '')
      const slug = text.toLowerCase().replace(/\s+/g, '-')
      return React.createElement('h' + props.level, { id: slug }, props.children)
    }

    return (
      <BrowserRouter basename={hostBasename} forceRefresh={true}>
        <article className='markdown-body post' key={key}>
          <ReactMarkdown source={post.content} renderers={{ heading: headingRenderer }} />
          {postPanel}
        </article>
      </BrowserRouter>
    );
  };
}

Post.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
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
