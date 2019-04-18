import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCategories } from '../redux/editing-post/actions';
import { GoX } from 'react-icons/go'
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

  addCategory = (category) => {
    const { categories, onUpdateCategoires } = this.props;

    if (categories === undefined || categories.includes(category)) {
      return;
    }

    onUpdateCategoires(categories.concat(category));
  }

  removeCategory = (event) => {
    const { categories, onUpdateCategoires } = this.props;

    const categoryId = event.currentTarget.id;
    const existentCategory = categories.find(category => category._id === categoryId);

    if (existentCategory === undefined) {
      return;
    }

    onUpdateCategoires(categories.filter(category => category !== existentCategory));
  }

  displaySelectorPopup = (event) => {
    this.setState({
      isSettingCategories: event.target.id === this.state.categorySelectorButtonId
    });
  }

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
    const { allCategories } = this.state;

    const selectedMark = (<FaCheck className='selected-mark' />);

    const allCategoriesList = allCategories !== null ? allCategories.map((category, index) => {
      const isInPostCategories = categories.includes(category);
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

    const categoryList = categories !== undefined ? categories.map((category, index) => (
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
            <button type='button'>Create new category</button>
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
          <button type='button' id='category-selector-button' onClick={this.displaySelectorPopup}>{terms.label.setCategories}</button>
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
  onUpdateCategoires: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allCategories: state.category.categories,
  categories: state.editingPost.categories
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateCategoires: (categories) => {
    dispatch(updateCategories(categories));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
