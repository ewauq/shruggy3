import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('ping');
    this.reply_type = this.getProperties().reply_type;
    this.replies = this.getProperties().replies;
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        this.reply = this.getReply(this.replies);
      } catch (error) {
        reject(error);
      }
      resolve({
        reply: this.reply,
        type: this.reply_type,
      });
    });
  }

}

module.exports = new Command();
