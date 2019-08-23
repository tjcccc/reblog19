import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
// import { loadPost } from '../redux/editing-post/actions';
import { fetchPostById, createPost } from '../services/post.service';
import { getCategoryById } from '../services/category.service';
import { fetchTagById } from '../services/tag.service';
import Editor from './Editor';
import StatusSelector from './StatusSelector';
import CategorySelector from './CategorySelector';
import TagPin from './TagPin';
import terms from '../config/terms';
import logger from '../utilities/logger';

class EditorPage extends Component {
  constructor(props) {
    super(props);

    const newPost = {
      content: '',
      status: 0,
      categories: [],
      tags: []
    }

    this.state = {
      isNew: true,
      editingPost: newPost,
      id: '',
      content: '',
      status: 0,
      category_ids: [],
      tag_ids: [],
      categories: [],
      tags: []
    };
  }

  getPostById = async (id) => {
    const fetchedPost = await fetchPostById(id)
    return fetchedPost.data.data.post;
  };

  loadPost = (post) => {
    logger.info(post);
    this.setState({
      isNew: false,
      editingPost: post,
      id: post._id ? post._id : '',
      content: post.content,
      status: post.status,
      category_ids: post.category_ids,
      tag_ids: post.tag_ids,
      categories: post.categories,
      tags: post.tags
    });
    // logger.info(this.state.categories);
    // logger.info(`post categories: ${this.state.categories}`);
    // this.props.onLoadPost(post);
  };

  handleSubmit= (event) => {
    event.preventDefault();
  }

  extractTitle = (content) => {
    let title = 'New Post';
    if (content.charAt(0) === '#') {
      const titleEndIndex = content.indexOf('\n');
      title = content.slice(2, titleEndIndex);
    } else if (content.length > 20) {
      title = content.slice(0, 20) + '...';
    } else {
      title = content;
    }
    return title;
  }

  getPostCategories = (allCategories, categoryIds) => {
    if (!Array.isArray(categoryIds) || categoryIds.length < 1 ) {
      return undefined;
    }

    // If allCategories is none (not fetched), categoryCollection must be none, because it cannot get full category data by its ids.
    if (!Array.isArray(allCategories) || allCategories.length < 1) {
      return undefined;
    }

    // If categoryId not match any element in allCategories, do not add undefined to result array.
    return categoryIds.map(categoryId => getCategoryById(allCategories, categoryId)).filter(category => category !== undefined);
  };

  getPostTags = async (tagIds) => {
    return tagIds.map(async (tagId) => await fetchTagById(tagId));
  };

  updateContent = (content) => {
    this.setState({ content: content });
  };

  updateStatus = (status) => {
    this.setState({ status: status });
  };

  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };

  updateTags = (tags) => {
    this.setState({ tags: tags });
  };

  save = async () => {
    const { editingPost, id, content, status, categories, tags } = this.state;
    const post = {
      ...editingPost,
      id: id,
      title: this.extractTitle(editingPost.content),
      content: content,
      status: status,
      categories: categories,
      tags: tags
    }

    logger.info(post);
    return;

    // TODO: POST to server.

    // const postChecking = await fetchPostById(post._id);

    // if (postChecking.data.post === undefined) {
    //   // New post
    //   const newPost = await createPost(post);
    //   logger.info(newPost);
    // } else {
    //   // TODO: Update old post.
    // }
  }

  componentDidMount = async () => {
    const { id } = this.props.routeData.match.params;

    if (!id) {
      return;
    }

    const remotePost = await this.getPostById(id);
    await this.loadPost(remotePost);
  };

  render = () => {
    // const { allCategories } = this.props;
    const { content, status, categories, tags } = this.state;
    const loadingLabel = terms.placeholder.loading;
    logger.info('post category: ');
    logger.info(categories);

    // const postCategories = this.getPostCategories(allCategories, categories);
    // const postTags = this.getPostTags(tags);

    // logger.info('all category: ')
    // logger.info(allCategories);

    // logger.info('category collection: ')
    // logger.info(categoryCollection);

    return (
      <form className='container responsive-container' id='blog-post' onSubmit={this.handleSubmit}>
        <article>
          <Editor content={content ? content: loadingLabel} formId='blog-post' handleUpdating={this.updateContent} handleSaving={this.save} />
        </article>
        <aside className='editor-options'>
          <StatusSelector status={status} handleUpdating={this.updateStatus} />
          <CategorySelector categories={categories} handleUpdating={this.updateCategories} />
          <TagPin tags={tags} handleUpdating={this.updateTags} />
        </aside>
      </form>
    );
  }
}

EditorPage.propTypes = {
  isNew: PropTypes.bool,
  // id: PropTypes.string,
  // content: PropTypes.string,
  // status: PropTypes.number,
  // categories: PropTypes.arrayOf(PropTypes.shape({
  //   _id: PropTypes.string,
  //   order_id: PropTypes.number,
  //   label: PropTypes.string,
  //   count: PropTypes.number
  // })),
  // tags: PropTypes.arrayOf(PropTypes.string),
  routeData: any,
  allCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  }))
  // onLoadPost: PropTypes.func.isRequired
}

// const mapDispatchToProps = (dispatch) => ({
//   onLoadPost: (post) => {
//     dispatch(loadPost(post));
//   }
// });

const mapStateToProps = state => ({
  allCategories: state.category.categories
  // categories: state.editingPost.categories
});

EditorPage.displayName = 'EditorPage';

export default connect(mapStateToProps, null)(EditorPage);
