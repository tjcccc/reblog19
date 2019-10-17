import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import converter from '../utilities/converter';
import logger from '../utilities/logger';

class Chronicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: 0
    }
  }

  displayName = 'Chronicle';

  getCurrentYear = () => {
    return 2019;
  }

  getEarliestYear = () => {
    return 2014;
  }

  selectYear = (year) => {
    logger.trace(year);
    this.setState({
      selectedYear: parseInt(year)
    })
  }

  render = () => {
    const { firstYear } = this.props;
    const { selectedYear } = this.state;

    const currentYear = this.getCurrentYear();
    const yearList = converter.getRange(firstYear, currentYear + 1).reverse();

    const monthList = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    const months = monthList.map((month, index) => <li key={index}><a href="#">{month} (?)</a></li>);

    const years = yearList.map((year, index) =>
      <div key={index} className={year === selectedYear ? 'reveal' : 'hide'}>
        <button onClick={() => this.selectYear(year)}>{year} (?)</button>
        <ul>
          {months}
        </ul>
      </div>
    );

    return (
      <div>
        <h2>Date</h2>
        {years}
      </div>
    );
  };

}

Chronicle.propTypes = {
  firstYear: PropTypes.number
}

export default connect()(Chronicle);
