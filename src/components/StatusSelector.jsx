import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';
import logger from '../utilities/logger';

class StatusSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStatus: this.statusCode.draft,
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
    handleUpdating(status);
    console.log(status);
  }

  static getDerivedStateFromProps = (props, state) => {
    if (state.selectedStatus === props.status) {
      return null;
    }
    return {
      selectedStatus: props.status
    };
  };

  render = () => {
    const { selectedStatus, draftLabel, publishLabel } = this.state;

    logger.info(`component: ${selectedStatus}`);

    return (
      <div className='side-block'>
        <h2>Post Status</h2>
        <select value={selectedStatus} onChange={this.handleOptionChange}>
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
