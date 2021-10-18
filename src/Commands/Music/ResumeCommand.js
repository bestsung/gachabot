const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class ResumeCommand extends Command {
  constructor() {
    super('resume', {
      aliases: ['resume', 'r'],
      description: {
        content: 'Resume current track',
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
      GuildPlayers.pause(false);
      return msg.channel.send({ embeds: [CreateEmbed('info', '👌 | เล่นต่อ')] });
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
      GuildPlayers.pause(false);
      return interaction.editReply({ embeds: [CreateEmbed('info', '👌 | เล่นต่อ')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
