import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEarliestPost } from '../services/post.service';
import months from '../config/months';
import converter from '../utilities/converter';
import logger from '../utilities/logger';

class Chronicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: 2019,
      selectedMonthId: 0,
      currentYear: (new Date()).getFullYear(),
      monthList: months.reverse()
    }
  }

  displayName = 'Chronicle';

  getEarliestYear = async () => {
    return await fetchEarliestPost().data;
  }

  selectYear = (year) => {
    // logger.trace(year);
    const yearInt = parseInt(year);
    this.setState({
      selectedYear: yearInt === this.state.selectedYear ? 0 : yearInt
    })
  }

  selectMonth = async (monthId) => {
    const year = this.state.selectedYear;
    this.setState({
      selectedMonthId: monthId
    })
    const { fetchPosts } = this.props;
    logger.trace(typeof(fetchPosts));
    await fetchPosts(year, monthId);
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
      <div key={index} className={year === selectedYear ? 'reveal' : 'hide'}>
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
  fetchPosts: PropTypes.func.isRequired
}

export default connect()(Chronicle);
