import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoX } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa';
import ClickOutside from 'react-click-outside';
import terms from '../config/terms';

class CategorySelector extends Component {

  constructor(props) {
    super(props);
    const { allCategories } = this.props;

    this.state = {
      allCategories: allCategories,
      isSettingCategories: false,
      categorySelectorButtonId: 'category-selector-button'
    }
  }

  updatePostCategories = (categories) => {
    const { handleUpdating } = this.props;

    if (!handleUpdating) {
      return;
    }

    this.setState({
      editingCategories: categories
    })

    handleUpdating(categories);
  }

  addCategory = (category) => {
    const { categories } = this.props;

    if (categories === null) {
      this.updatePostCategories([].concat(category));
      return;
    }

    if (categories.includes(category)) {
      return;
    }

    this.updatePostCategories(categories.concat(category));
  }

  removeCategory = (event) => {
    const { categories } = this.props;

    const categoryId = event.currentTarget.id;
    const existentCategory = categories.find(category => category._id === categoryId);

    if (!existentCategory) {
      return;
    }

    this.updatePostCategories(categories.filter(category => category !== existentCategory));
  }

  displaySelectorPopup = (event) => {
    this.setState({
      isSettingCategories: event.target.id === this.state.categorySelectorButtonId
    });
  }

  // Update all categories list from redux state.
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.allCategories !== prevState.allCategories) {
      return {
        allCategories: nextProps.allCategories
      };
    }
    return null;
  };

  render = () => {
    const { categories } = this.props;
    const { allCategories, editingCategories } = this.state;

    const selectedMark = (<FaCheck className='selected-mark' />);
    const selectedCategories = editingCategories ? editingCategories : categories;

    const allCategoriesList = Array.isArray(allCategories) && allCategories.length > 0 ? allCategories.map((category, index) => {
      const isInPostCategories = Array.isArray(selectedCategories) ? selectedCategories.some(selectedCategory => category._id === selectedCategory._id) : false;
      return (
        <li className={isInPostCategories ? 'selected' : ''}
          key={index}
          id={category._id}
          onClick={(event) => isInPostCategories ? this.removeCategory(event) : this.addCategory(category)}>
          {isInPostCategories ? selectedMark : null}
          {category.label}
        </li>
      );
    }) : null;

    const categoryList = Array.isArray(selectedCategories) && selectedCategories.length > 0 ? selectedCategories.map((category, index) => (
      <li key={index}>
        <span>{category.label}</span>
        <button type='button' id={category._id} onClick={this.removeCategory}><GoX /></button>
      </li>
    )) : null;

    const selectorPopup = (
      <ClickOutside onClickOutside={this.displaySelectorPopup}>
        <div className='category-selector'>
          <h3>Apply categories to this post</h3>
          <div className='filter-bar'>
            <input type='text' placeholder='Filter categories...' />
            <button className='normal' type='button'>Create new category</button>
          </div>
          <ul className='aside-optional-list'>
            {allCategoriesList}
          </ul>
        </div>
      </ClickOutside>
    );

    return (
      <div className='side-block'>
        <h2>Categories</h2>
        <ul className='aside-selected-list'>
          {categoryList}
        </ul>
        <p>
          <button className='normal' type='button' id='category-selector-button' onClick={this.displaySelectorPopup}>{terms.label.setCategories}</button>
        </p>
        {this.state.isSettingCategories ? selectorPopup : null}
      </div>
    );
  }

}

CategorySelector.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  handleUpdating: PropTypes.func.isRequired
  // onUpdateCategories: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allCategories: state.category.categories
  // categories: state.editingPost.categories
});

// const mapDispatchToProps = (dispatch) => ({
//   onUpdateCategories: (categories) => {
//     dispatch(updateCategories(categories));
//   }
// });

export default connect(mapStateToProps, null)(CategorySelector);
