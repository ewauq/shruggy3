import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('ping');
    this.replies = this.getProperties().replies;
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        this.reply = this.getReply(this.replies);
      } catch (error) {
        reject(error);
      }
      resolve(this.reply);
    });
  }

}

module.exports = new Command();
