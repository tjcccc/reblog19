import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import converter from '../utilities/converter';

class Chronicle extends Component {
  constructor(props) {
    super(props);
  }

  displayName = 'Chronicle';

  getCurrentYear = () => {
    return 2019;
  }

  getEarliestYear = () => {
    return 2014;
  }

  render = () => {
    const { firstYear } = this.props;

    const currentYear = this.getCurrentYear();
    const yearList = converter.getRange(firstYear, currentYear + 1);

    const monthList = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    const months = monthList.map((month, index) => <li key={index}><a href="#">{month} (?)</a></li>);

    const years = yearList.map((year, index) =>
      <div key={index}>
        <a href='#'>{year}</a>
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
