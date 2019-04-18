import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import logger from '../utilities/logger';

class CategorySelector extends Component {

  constructor(props) {
    super(props);
    const { categories, post } = this.props;
    this.state = {
      categories: categories,
      post: post
    }
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

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.categories !== prevState.categories) {
      return {
        categories: nextProps.allCategories,
        post: prevState.post
      };
    }

    if (nextProps.post !== prevState.post) {
      return {
        categories: prevState.categories,
        post: nextProps.post
      };
    }

    return null;
  };

  render = () => {
    if (this.state.categories === undefined) {
      return (<div>Loading...</div>);
    }

    // const selectedMark = () => {
    //   return (<FaCheck className='selected-mark' />);
    // }

    const categories = this.state.categories.map((category, index) =>
      <li className='' key={index} onClick={() => this.addCategory(this.state.post, category)}>
        {/* {selectedMark} */}
        {category.label}
      </li>
    );

    return (
      <div className='category-selector'>
        <h3>Apply categories to this post</h3>
        <div className='filter-bar'>
          <input type='text' placeholder='Filter categories...' />
          <button type='button'>Create new category</button>
        </div>
        <ul className='aside-optional-list'>
          {categories}
        </ul>
      </div>
    );
  }

}

CategorySelector.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  post: PropTypes.shape({
    article: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    publishState: PropTypes.number
  })
}

export default connect()(CategorySelector);
