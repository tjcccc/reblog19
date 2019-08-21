import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';
// import logger from '../utilities/logger';

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
    const { handleUpdating } = this.props;
    const status = parseInt(event.target.value, 10);
    this.setState({ selectedStatus: status });

    if (!handleUpdating) {
      return;
    }

    handleUpdating(status);
  }

  render = () => {
    const { status } = this.props;
    const { selectedStatus, draftLabel, publishLabel } = this.state;

    return (
      <div className='side-block'>
        <h2>Post Status</h2>
        <select value={selectedStatus ? selectedStatus : status} onChange={this.handleOptionChange}>
          <option value={this.statusCode.draft}>{draftLabel}</option>
          <option value={this.statusCode.publish}>{publishLabel}</option>
        </select>
      </div>
    );
  }
}

StatusSelector.propTypes = {
  status: PropTypes.number,
  handleUpdating: PropTypes.func.isRequired
}

export default connect()(StatusSelector);
