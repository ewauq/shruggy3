import date from 'date-and-time';
import BaseCommand from '../';

date.locale('fr');

class Command extends BaseCommand {

  constructor() {
    super('e3');
    this.replies = this.getProperties().replies;
    this.date = this.getProperties().date;
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        const date_obj = this.date.split('-');
        const diff = Math.abs((new Date(date_obj)) - (new Date()));

        const data = {
          date: date.format(new Date(date_obj), 'dddd D MMMM YYYY'),
          days: Math.ceil(diff / (1000 * 3600 * 24)),
        };

        this.reply = this.getReply(this.replies, data);
      } catch (error) {
        reject(error);
      }
      resolve(this.reply);
    });
  }

}

module.exports = new Command();
