import * as moment from 'moment';

//Date format is AAAA/MM/DD
class Moment {
  format(date: Date) {
    moment(date).format('L');
  }

  isValid(date: any): boolean {
    return moment(date, 'MMMM Do YYYY, h:mm:ss a').isValid();
  }
}

export default new Moment();
