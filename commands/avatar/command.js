import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('avatar');
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
      resolve(this.reply);
    });
  }

}

module.exports = new Command();
