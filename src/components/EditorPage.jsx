import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { fetchPostById, checkIfPostExistsById, createPost, updatePost } from '../services/post.service';
import { getCategoryById } from '../services/category.service';
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
      tags: [],
      categories: [],
      isAbleToSave: false
    };
  }

  getPostById = async (id) => {
    const fetchedPost = await fetchPostById(id)
    return fetchedPost.data.data.post;
  };

  loadPost = (post) => {
    if (!this.props.isAdmin) {
      return;
    }

    logger.info(post);
    this.setState({
      isNew: false,
      editingPost: post,
      id: post._id ? post._id : '',
      content: post.content,
      status: post.status,
      category_ids: post.category_ids,
      tags: post.tags,
      categories: post.categories,
      isAbleToSave: true
    });
  };

  handleSubmit = (event) => {
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

  updateContent = (content) => {
    const prevContent = this.state.content;
    this.setState({
      isAbleToSave: (content !== '' && content !== prevContent),
      content: content
    });
  };

  updateStatus = (status) => {
    this.setState({ status: status });
  };

  updateCategories = (categories) => {
    this.setState({
      category_ids: categories.map(category => (category._id)),
      categories: categories
    });
  };

  updateTags = (tags) => {
    this.setState({ tags: tags });
  };

  save = async () => {
    const { editingPost, id, content, status, category_ids, tags, categories } = this.state;
    const post = {
      ...editingPost,
      _id: id,
      title: this.extractTitle(content),
      content: content,
      status: status,
      category_ids: category_ids,
      tags: tags,
      categories: categories
    }

    logger.info('post: ');
    logger.info(post);

    const postChecking = await checkIfPostExistsById(post._id);
    logger.info(`Is this post already exist? ${postChecking.data.data.postExistence}`);

    if (!postChecking.data.data.postExistence) {
      // New post
      logger.info('Creating...');
      const newPost = await createPost(post);
      logger.info(newPost);
    } else {
      // Update old post.
      logger.info('Updating...');
      const updatedPost = await updatePost(post);
      logger.info(updatedPost);
    }
  }

  componentDidMount = async () => {
    const { id } = this.props.routeData.match.params;

    if (!id) {
      return;
    }

    this.setState({ content: terms.placeholder.loading })

    const remotePost = await this.getPostById(id);
    await this.loadPost(remotePost);
  };

  render = () => {
    const { isAdmin } = this.props;
    const { content, status, categories, tags, isAbleToSave } = this.state;
    // logger.info(`Is Admin: ${isAdmin}`);

    const noAuthorizedPage = (
      <div className='warning'>
        <h3>{terms.warning.noAuthorized}</h3>
      </div>
    );
    const editorPage = (
      <form className='container responsive-container' id='blog-post' onSubmit={this.handleSubmit}>
        <article>
          <Editor
            content={content ? content: '' }
            formId='blog-post'
            handleUpdating={this.updateContent}
            handleSaving={this.save}
            trigger={isAbleToSave} />
        </article>
        <aside className='editor-options'>
          <StatusSelector status={status} handleUpdating={this.updateStatus} />
          <CategorySelector categories={categories} handleUpdating={this.updateCategories} />
          <TagPin tags={tags} handleUpdating={this.updateTags} />
        </aside>
      </form>
    );

    return isAdmin ? editorPage : noAuthorizedPage;
  }
}

EditorPage.propTypes = {
  isAdmin: PropTypes.bool,
  isNew: PropTypes.bool,
  routeData: any,
  allCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  }))
}

const mapStateToProps = state => ({
  isAdmin: state.authorization.isAdmin,
  allCategories: state.category.categories
});

EditorPage.displayName = 'EditorPage';

export default connect(mapStateToProps, null)(EditorPage);
