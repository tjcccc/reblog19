import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPostById } from '../services/post.service';
import ReactMarkdown from 'react-markdown';

class PostPage extends Component {
  constructor(props) {
    super(props);
    const { post } = this.props;
    this.state = { post: post };
  }
  displayName = 'PostPage';

  getPostById = async (id) => {
    const fetchedPost = await fetchPostById(id)
    return fetchedPost.data.data.post;
  };

  componentDidMount = async () => {
    const { id } = this.props.routeData.match.params;
    const remotePost = await this.getPostById(id);
    this.setState({ post: remotePost });
  };

  render = () => {
    const { post } = this.state;
    const content = post && post.content ? post.content : '';

    // Reference: https://github.com/rexxars/react-markdown/issues/69#issuecomment-289860367

    const flatten = (text, child) => {
      return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text)
    }

    const headingRenderer = (props) => {
      var children = React.Children.toArray(props.children)
      var text = children.reduce(flatten, '')
      var slug = text.toLowerCase().replace(/\s+/g, '-')
      return React.createElement('a', { className: `toc-list-${props.level}`, href: `#${slug}` }, props.children)
    }

    return (
      <div className='container'>
        <article className='post-single'>
          {(!post || post === undefined) ? <h4>No content.</h4> : <Post data={post} key={0} />}
        </article>
        <aside className='post-toc'>
          <h2>Table of content</h2>
          <ReactMarkdown
            source={content}
            disallowedTypes={['paragraph', 'listItem', 'code']}
            renderers={ { heading: headingRenderer } } />
        </aside>
      </div>
    );
  };
}

PostPage.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createTime: PropTypes.string,
    postTime: PropTypes.string,
    updateTime: PropTypes.string,
    content: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  routeData: any
}

PostPage.displayName = 'PostPage';

export default connect()(PostPage);
