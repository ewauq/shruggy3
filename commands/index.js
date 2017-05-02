export default class BaseCommand {

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getProperties() {
    return require(`../commands/${this.name}/properties.json`);
  }

  getReply(replies) {
    const rnd = Math.floor(Math.random() * replies.length);
    return replies[rnd];
  }

}
