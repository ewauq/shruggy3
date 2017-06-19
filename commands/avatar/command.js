import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('avatar');
    this.reply_type = this.getProperties().reply_type;
    this.errors = this.getProperties().errors;
  }

  execute(message) {
    return new Promise((resolve, reject) => {
      try {
        if (message.mentions.users.size === 1) {
          this.reply = message.mentions.users.first().avatarURL;
        } else if (message.mentions.users.size > 1) {
          this.reply = this.getReply(this.errors);
        } else {
          this.reply = message.author.avatarURL;
        }
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
