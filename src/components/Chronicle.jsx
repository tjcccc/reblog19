import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEarliestPost } from '../services/post.service';
import { reversedMonths } from '../config/months';
import converter from '../utilities/converter';
// import logger from '../utilities/logger';

class Chronicle extends Component {
  constructor(props) {
    super(props);
    const currentYear = (new Date()).getFullYear();
    this.state = {
      selectedYear: currentYear,
      selectedMonthId: 0,
      currentYear: currentYear,
      monthList: reversedMonths
    }
  }

  displayName = 'Chronicle';

  getEarliestYear = async () => {
    return await fetchEarliestPost().data;
  }

  selectYear = async (year) => {
    // logger.trace(year);
    const yearInt = parseInt(year);
    this.setState({
      selectedYear: yearInt === this.state.selectedYear ? 0 : yearInt
    });
    const { fetchPosts, statusForPost } = this.props;
    await fetchPosts(yearInt, -1, statusForPost);
  }

  selectMonth = async (monthId) => {
    const year = this.state.selectedYear;
    const { statusForPost } = this.props;
    this.setState({
      selectedMonthId: monthId
    })
    const { fetchPosts } = this.props;
    // logger.trace(typeof(fetchPosts));
    await fetchPosts(year, monthId, statusForPost);
  };

  render = () => {
    const { firstYear } = this.props;
    const { selectedYear, selectedMonthId, currentYear, monthList } = this.state;

    const months = monthList.map((month, index) =>
      <li key={index} className={month.id === selectedMonthId ? 'selected' : ''}>
        <button onClick={async () => await this.selectMonth(month.id)}>{month.name}</button>
      </li>
    );
    const yearList = converter.getRange(firstYear, currentYear + 1).reverse();
    const years = yearList.map((year, index) =>
      <div key={index} className={year === selectedYear ? 'collapse' : 'shrink'}>
        <button className='year' onClick={() => this.selectYear(year)}>{year}</button>
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
  firstYear: PropTypes.number,
  fetchPosts: PropTypes.func.isRequired,
  statusForPost: PropTypes.number
}

export default connect()(Chronicle);
