import request from 'request-promise';
import BaseCommand from '../';


class Command extends BaseCommand {

  constructor() {
    super('cat');
    this.reply_type = this.getProperties().reply_type;
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        request('http://random.cat/meow')
          .then((response) => {
            const json = JSON.parse(response);
            resolve({
              reply: json.file,
              type: this.reply_type,
            });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = new Command();
