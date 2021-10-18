const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: {
        content: 'Gets the bot\'s heartbeat and latency',
      },
      category: 'อื่นๆ',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const message = await msg.channel.send('กำลังประมวลผล...');
      const embed = CreateEmbed('info')
        .addField('⏳ ความสเถียร ', `__**${message.createdTimestamp - msg.createdTimestamp}ms**__`)
        .addField('💓 API', `__**${Math.floor(this.client.ws.ping)}ms**__`)
        .setTimestamp();
      setTimeout(() => { message.edit({ content: null, embeds: [embed] }); }, 5000);
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
