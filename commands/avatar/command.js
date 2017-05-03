import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('avatar');
    this.name = this.getProperties().name;
    this.description = this.getProperties().description;
    this.triggers = this.getProperties().triggers;
  }

  execute(message) {
    return new Promise((resolve, reject) => {
      try {
        if (message.mentions.users.size > 0) {
          console.log(message.mentions.users);

          this.output = message.mentions.users.first().avatarURL;
        } else {
          this.output = message.author.avatarURL;
        }
      } catch (error) {
        reject(error);
      }
      resolve(this.output);
    });
  }

}

module.exports = new Command();
