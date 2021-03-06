import BaseCommand from '../';
import config from '../..//config.json';

class Command extends BaseCommand {

  constructor() {
    super('8ball');
    this.reply_type = this.getProperties().reply_type;
    this.replies = this.getProperties().replies;
    this.errors = this.getProperties().errors;
  }

  execute(message) {
    return new Promise((resolve, reject) => {
      try {
        let final_reply;

        // On met tout en minuscule pour éviter les problèmes de casse.
        const input = message.content.toLowerCase();

        // Récupération de la question.
        const reg = new RegExp(`${config.command_prefix}[0-9a-z]+\\s(.+)`);
        const matches = input.match(reg);

        if (matches && matches.length > 0) {
          final_reply = this.getReply(this.replies);
        } else {
          final_reply = this.getReply(this.errors);
        }

        this.reply = final_reply;
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
