import request from 'request-promise';
import BaseCommand from '../';


class Command extends BaseCommand {

  constructor() {
    super('cat');
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        request('http://random.cat/meow')
          .then((response) => {
            const json = JSON.parse(response);
            resolve(json.file);
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
