import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoX } from 'react-icons/go'
import { FaCheck } from 'react-icons/fa';
import Editor from './Editor';
import ClickOutside from 'react-click-outside';
import terms from '../config/terms';
import logger from '../utilities/logger';

class EditorPage extends Component {
  constructor(props) {
    super(props);
    const { isNew, post } = this.props;

    const newPost = {
      article: '',
      categories: [],
      tags: [],
      publishState: 0
    }

    this.state = {
      allCategories: [],
      isSettingCategories: false,
      categorySelectorButtonId: 'category-selector-button',
      newTag: '',
      post: isNew ? newPost : post
    };
  }

  handleSubmit= (event) => {
    event.preventDefault();
  }

  handleTagChange = (event) => {
    this.setState({ newTag: event.target.value });
  }

  addCategory = (post, category) => {
    if (post.categories === undefined || post.categories.includes(category)) {
      return;
    }
    // this.state.post.categories.push(category);
    this.setState(state => {
      return {
        ...state,
        post: {
          ...state.post,
          categories: state.post.categories.concat(category)
        }
      }
    });
    logger.info(this.state.post);
  }

  removeCategory = (event) => {
    const categoryId = event.currentTarget.id;
    const existentCategory = this.state.post.categories.find(category => category._id === categoryId);

    if (existentCategory === undefined) {
      return;
    }

    const index = this.state.post.categories.indexOf(existentCategory);

    this.state.post.categories.splice(index, 1);
    this.setState({});
  }

  displayCategorySelector = (event) => {
    this.setState({
      isSettingCategories: event.target.id === this.state.categorySelectorButtonId
    });
  }

  addTag = () => {
    if (this.state.newTag === '' || this.state.post.tags.indexOf(this.state.newTag) !== -1) {
      this.setState({ newTag: '' });
      return;
    }
    // this.state.post.tags.push(this.state.newTag);
    this.setState(state => {
      return {
        newTag: '',
        post: {
          ...state.post,
          tags: state.post.tags.concat(this.state.newTag)
        }
      }
   });
  };

  removeTag = (event) => {
    const targetTag = event.currentTarget.id;

    if (this.state.post.tags.indexOf(targetTag) === -1) {
      return;
    }

    this.setState(state => {
      return {
        ...state,
        post: {
          ...state.post,
          tags: state.post.tags.filter(tag => tag !== targetTag)
        }
      }
    });
  }

  handleTagInputReturnKey = (event) => {
    if (event.key === 'Enter') {
      this.addTag();
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.allCategories !== prevState.allCategories) {
      return { allCategories: nextProps.allCategories };
    }
    return null;
  };

  render = () => {

    const selectedMark = (<FaCheck className='selected-mark' />);

    const allCategories = this.state.allCategories !== undefined ? this.state.allCategories.map((category, index) => {
      const isInPostCategories = this.state.post.categories.includes(category);
      return (
        <li className={isInPostCategories ? 'selected' : ''}
          key={index}
          id={category._id}
          onClick={(event) => isInPostCategories ? this.removeCategory(event) : this.addCategory(this.state.post, category)}>
          {isInPostCategories ? selectedMark : null}
          {category.label}
        </li>
      );
    }) : null;

    const categorySelector = (
      <ClickOutside onClickOutside={this.displayCategorySelector}>
        <div className='category-selector'>
          <h3>Apply categories to this post</h3>
          <div className='filter-bar'>
            <input type='text' placeholder='Filter categories...' />
            <button type='button'>Create new category</button>
          </div>
          <ul className='aside-optional-list'>
            {allCategories}
          </ul>
        </div>
      </ClickOutside>
    );

    // const categorySelector = (
    //   <ClickOutside onClickOutside={this.displayCategorySelector}>
    //     <CategorySelector categories={this.state.allCategories} post={this.state.post} id='category-selector' />
    //   </ClickOutside>
    // );

    const categoryList = this.state.post.categories !== undefined ? this.state.post.categories.map((category, index) => (
      <li key={index}>
        <span>{category.label}</span>
        <button type='button' id={category._id} onClick={this.removeCategory}><GoX /></button>
      </li>
    )) : null;

    const tagList = this.state.post.tags !== undefined ? this.state.post.tags.map((tag, index) => (
      <li key={index}>
        <span>{tag}</span>
        <button type='button' id={tag} onClick={this.removeTag}><GoX /></button>
      </li>
    )): null;

    return (
      <form className='container responsive-container' id='blog-post' onSubmit={this.handleSubmit}>
        <article>
          <Editor post={this.state.post} formId='blog-post' />
        </article>
        <aside className='editor-options'>
          <div className='side-block'>
            <h2>Post State</h2>
            <select>
              <option>{terms.label.draftState}</option>
              <option>{terms.label.publishState}</option>
            </select>
          </div>
          <div className='side-block'>
            <h2>Categories</h2>
            <ul className='aside-selected-list'>
              {categoryList}
            </ul>
            <p>
              <button type='button' id='category-selector-button' onClick={this.displayCategorySelector}>{terms.label.setCategories}</button>
            </p>
            {this.state.isSettingCategories ? categorySelector : null}
          </div>
          <div className='side-block'>
            <h2>Tags</h2>
            <ul className='aside-selected-list'>
              {tagList}
            </ul>
            <p>
              <input
                id='post-tags'
                type='text'
                placeholder={terms.label.setTags}
                value={this.state.newTag}
                onChange={this.handleTagChange}
                onKeyPress={this.handleTagInputReturnKey}
              />
              <button type='button' onClick={this.addTag}>{terms.label.add}</button>
            </p>
          </div>
        </aside>
      </form>
    );
  }
}

EditorPage.propTypes = {
  isNew: PropTypes.bool,
  post: PropTypes.shape({
    article: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      order_id: PropTypes.number,
      label: PropTypes.string,
      count: PropTypes.number
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
    publishState: PropTypes.number
  }),
  allCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  }))
}

const mapStateToProps = state => ({
  allCategories: state.category.categories
});

export default connect(mapStateToProps, null)(EditorPage);
