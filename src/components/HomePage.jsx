import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FaRss } from 'react-icons/fa'
import PostCollection from './PostCollection';
import CategoryCollection from './CategoryCollection';
import TagCollection from './TagCollection';
// import terms from '../config/terms';
// import logger from '../utilities/logger';

class HomePage extends Component {
  render = () => {
    const { categories, tags } = this.props;

    return (
      <div className='container responsive-container'>
        <PostCollection postsPerPage={10} />
        <aside>
          <CategoryCollection categories={categories} />
          <TagCollection tags={tags} />
          {/* <p className='aside-option'>
            <FaRss />
            <a href='/'>{terms.label.subscribe}</a>
          </p> */}
        </aside>
      </div>
    );
  };
}

HomePage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  tags: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    label: PropTypes.string,
    count: PropTypes.number
  }))
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  tags: state.tag.tags
});

export default connect(mapStateToProps, null)(HomePage);
