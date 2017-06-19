import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('coin');
    this.reply_type = this.getProperties().reply_type;
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
      resolve({
        reply: this.reply,
        type: this.reply_type,
      });
    });
  }

}

module.exports = new Command();
