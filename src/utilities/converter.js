import moment from 'moment';
import locale from '../config/locale';

const converter = {
  getLocalDate: (dateIsoString) => {
    return moment(dateIsoString).utcOffset(locale.timezone).format('YYYY-MM-DD HH:mm');
  },
  getRange: (from, to) => {
    return [...Array(parseInt(to) - parseInt(from)).keys()].map(i => parseInt(from) + i);
  }
}

export default converter;
