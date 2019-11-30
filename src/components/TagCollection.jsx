import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectTagId } from '../redux/post/actions';
import terms from '../config/terms';

class TagCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: ''
    };
  }

  selectTag = (id) => {
    const tagId = this.state.selectedId === id ? '' : id;
    this.props.onSelectTag(tagId);
    this.setState({
      selectedId: tagId
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.listCategoryId !== this.props.listCategoryId && this.props.listCategoryId !== '') {
        this.setState({
          selectedId: ''
        });
    }
  };

  render = () => {
    const { tags } = this.props;
    const tagList = tags === undefined || tags === null ? null : tags.sort((a, b) => (b.count - a.count)).map((tag, index) =>
      <button key={index} onClick={() => this.selectTag(tag._id)} className={this.state.selectedId === tag._id ? 'selected' : ''}>{tag.label}</button>
    );
    return (
      <nav className='side-block tag-collection'>
        <h2>{terms.title.tagCollection}</h2>
        <div>{tagList}</div>
      </nav>
    );
  }
}

TagCollection.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  listCategoryId: PropTypes.string,
  listTagId: PropTypes.string,
  selectedId: PropTypes.number,
  onSelectTag: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  listCategoryId: state.post.listCategoryId,
  listTagId: state.post.listTagId
});

const mapDispatchToProps = (dispatch) => ({
  onSelectTag: (categoryId) => {
    dispatch(selectTagId(categoryId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TagCollection);
