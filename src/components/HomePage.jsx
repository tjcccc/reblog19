import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FaRss } from 'react-icons/fa'
import PostCollection from './PostCollection';
import CategoryCollection from './CategoryCollection';
import TagCollection from './TagCollection';
import UserPanel from './UserPanel';
import { navButtonId, triggerButtonNav } from '../config/bottom-nav';
// import terms from '../config/terms';
// import logger from '../utilities/logger';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomNavId: ''
    };
  }

  triggerButtonNav = (event) => {
    const { bottomNavId } = this.state;
    const eventId = event.currentTarget.id;
    const updatedId = bottomNavId === eventId ? '' : eventId;
    this.setState({
      bottomNavId: updatedId
    });
  }

  render = () => {
    const { categories, tags } = this.props;
    const { bottomNavId } = this.state;

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
        <div className={bottomNavId !== '' ? 'bottom-menu' : 'hide'}>
          <div id={navButtonId.userMenu} className={bottomNavId === navButtonId.userMenu ? 'bottom-menu-section' : 'hide'}><UserPanel /></div>
          <div id={navButtonId.category} className={bottomNavId === navButtonId.category ? 'bottom-menu-section' : 'hide'}><CategoryCollection categories={categories} /></div>
          <div id={navButtonId.tagsCloud} className={bottomNavId === navButtonId.tagsCloud ? 'bottom-menu-section' : 'hide'}><TagCollection tags={tags} /></div>
        </div>
        <nav className={bottomNavId !== '' ? 'bottom-nav' : 'bottom-nav bottom-shadow'}>
          <button id={navButtonId.userMenu} className={bottomNavId === navButtonId.userMenu ? 'selected' : ''} onClick={event => triggerButtonNav(this, event)}>{navButtonId.userMenu}</button>
          <button id={navButtonId.category} className={bottomNavId === navButtonId.category ? 'selected' : ''} onClick={event => triggerButtonNav(this, event)}>{navButtonId.category}</button>
          <button id={navButtonId.tagsCloud} className={bottomNavId === navButtonId.tagsCloud ? 'selected' : ''} onClick={event => triggerButtonNav(this, event)}>{navButtonId.tagsCloud}</button>
        </nav>
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
