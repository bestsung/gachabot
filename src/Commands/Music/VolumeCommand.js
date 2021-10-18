const { Command, Argument } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class VolumeCommand extends Command {
  constructor() {
    super('Volume', {
      aliases: ['Volume'],
      description: {
        content: 'Change music volume',
      },
      category: 'เพลง',
      cooldown: 3000,
      args: [
        {
          id: 'volume',
          type: Argument.range('number', 1, 101),
          match: 'rest',
          prompt: {
            start: 'ระดับเสียงที่คุณต้องการ? (1-100)',
            retry: 'between 1-100',
          },
        },
      ],
    });
  }

  async exec(msg, { volume }) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | ไม่มีดนตรีเล่นในเซิฟเวอร์นี้')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | คุณต้องเข้าร่วมห้องเพื่อใช้คำสั่ง')] });
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | คุณต้องเข้าร่วมห้องเดียวกับฉันเพื่อใช้คำสั่ง')] });
      GuildPlayers.setVolume(volume);
      return msg.channel.send({ embeds: [CreateEmbed('info', `👌 | เปลี่ยนระดับเสียงเป็น \`${volume}\``)] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
