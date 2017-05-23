import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('coin');
    this.replies = this.getProperties().replies;
  }

  execute(message) {
    return new Promise((resolve, reject) => {
      try {
        const reply = this.getReply(this.replies);
        const trigger = message.content.substr(1, message.content.length);
        const state = (reply.toLocaleLowerCase().indexOf(trigger) > -1) ? ':thumbsup:' : ':thumbsdown:';

        this.reply = `${reply} ${state}`;
      } catch (error) {
        reject(error);
      }
      resolve(this.reply);
    });
  }

}

module.exports = new Command();
