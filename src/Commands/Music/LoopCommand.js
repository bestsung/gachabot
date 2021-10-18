const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class LoopCommand extends Command {
  constructor() {
    super('loop', {
      aliases: ['loop'],
      description: {
        content: 'Loop guild queue',
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
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | คุณต้องเข้าร่วมห้องเดียวกับฉันเพื่อใช้คำสั่ง')] });
      GuildPlayers.setQueueRepeat(!GuildPlayers.queueRepeat);
      return msg.channel.send({ embeds: [CreateEmbed('info', `👌 | ${GuildPlayers.queueRepeat ? '__เปิด__ใช้งานลูป' : '__ปิด__ใช้งานลูป'}`)] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
