import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectCategoryId } from '../redux/post/actions';
import terms from '../config/terms';

class CategoryCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: ''
    };
  }

  selectCategory = (id) => {
    const categoryId = this.state.selectedId === id ? '' : id;
    this.props.onSelectCategory(categoryId);
    this.setState({
      selectedId: categoryId
    });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.listTagId !== this.props.listTagId && this.props.listTagId !== '') {
        this.setState({
          selectedId: ''
        });
    }
  };

  render = () => {
    const { categories } = this.props;
    const categoryList = categories === undefined ? null : categories.map((category, index) =>
      (<a href='#/' key={index} onClick={() => this.selectCategory(category._id)} className={this.state.selectedId === category._id ? 'selected' : ''}>{category.label} ({category.count})</a>)
    );
    return (
      <nav className='side-block category-collection'>
        <h2>{terms.title.categoryCollection}</h2>
        {categoryList}
      </nav>
    );
  };
}

CategoryCollection.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  listCategoryId: PropTypes.string,
  listTagId: PropTypes.string,
  selectedId: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  listCategoryId: state.post.listCategoryId,
  listTagId: state.post.listTagId
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCategory: (categoryId) => {
    dispatch(selectCategoryId(categoryId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollection);
