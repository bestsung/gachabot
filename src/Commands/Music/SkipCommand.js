const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class SkipCommand extends Command {
  constructor() {
    super('skip', {
      aliases: ['skip', 's'],
      description: {
        content: 'Skip current playing track',
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
      GuildPlayers.stop();
      return msg.channel.send({ embeds: [CreateEmbed('info', '👌 | ข้ามแทร็กปัจจุบัน')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }

  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async executeSlash(interaction) {
    try {
      const GuildPlayers = this.client.erela.players.get(interaction.guild.id);
      if (!GuildPlayers) return interaction.editReply({ embeds: [CreateEmbed('info', '⛔ | ไม่มีดนตรีเล่นในเซิฟเวอร์นี้')] });
      if (!interaction.member.voice.channelId) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | คุณต้องเข้าร่วมห้องเพื่อใช้คำสั่ง')] });
      if (interaction.member.voice.channelId !== GuildPlayers.voiceChannel) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | คุณต้องเข้าร่วมห้องเดียวกับฉันเพื่อใช้คำสั่ง')] });
      GuildPlayers.stop();
      return interaction.editReply({ embeds: [CreateEmbed('info', '👌 | ข้ามแทร็กปัจจุบัน')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
