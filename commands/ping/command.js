import config from '../../config.json';
import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('ping');
    this.name = this.getProperties().name;
    this.description = this.getProperties().description;
    this.triggers = this.getProperties().triggers;
    this.replies = this.getProperties().replies;
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        this.output = this.getReply(this.replies);
      } catch (error) {
        reject(error);
      }
      resolve(this.output);
    });
  }

}

module.exports = new Command();
