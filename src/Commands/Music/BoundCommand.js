const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class BoundCommand extends Command {
  constructor() {
    super('bound', {
      aliases: ['bound'],
      description: {
        content: 'bound music channel',
      },
      category: 'เพลง',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | ไม่มีดนตรีเล่นในเซิฟเวอร์นี้')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | คุณต้องเข้าร่วมห้องเพื่อใช้คำสั่ง')] });
      if (msg.author.id !== GuildPlayers.queue?.current.requester.id) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Only requester can do this.')] });
      await GuildPlayers.setVoiceChannel(msg.member.voice.channelId);
      await GuildPlayers.setTextChannel(msg.channel.id);
      return msg.channel.send({ embeds: [CreateEmbed('info', '👌 | อัพเดท')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
