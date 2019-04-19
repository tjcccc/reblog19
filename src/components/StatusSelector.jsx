import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus } from '../redux/editing-post/actions';
import terms from '../config/terms';

class StatusSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draftLabel: terms.label.draftStatus,
      publishLabel: terms.label.publishStatus
    }
  }

  statusCode = {
    draft: 0,
    publish: 1
  };

  handleOptionChange = (event) => {
    const { onUpdateStatus } = this.props;
    var status = parseInt(event.target.value, 10);
    onUpdateStatus(status);
  }

  render = () => {
    const { status } = this.props;
    const { draftLabel, publishLabel } = this.state;

    return (
      <div className='side-block'>
        <h2>Post Status</h2>
        <select value={status} onChange={this.handleOptionChange}>
          <option value={this.statusCode.draft}>{draftLabel}</option>
          <option value={this.statusCode.publish}>{publishLabel}</option>
        </select>
      </div>
    );
  }

}

StatusSelector.propTypes = {
  status: PropTypes.number,
  onUpdateStatus: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  status: state.editingPost.status
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateStatus: (statusCode) => {
    dispatch(updateStatus(statusCode));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusSelector);
