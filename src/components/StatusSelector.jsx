import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class StatusSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.statusCode.draft,
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
    this.setState({ status: status });
    handleUpdating(status);
    console.log(status);
  }

  componentDidMount = () => {
    const { status } = this.props;
    console.log(`component: ${status}`);
    this.setState({ status });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.status !== this.state.status;
  };

  render = () => {
    const { status } = this.state;
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
  handleUpdating: PropTypes.func.isRequired
}

export default connect()(StatusSelector);
