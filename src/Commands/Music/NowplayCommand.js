const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class NowPlayCommand extends Command {
  constructor() {
    super('nowplay', {
      aliases: ['nowplay', 'np'],
      description: {
        content: 'Get the current playing',
      },
      category: 'เพลง',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | ไม่มีดนตรีเล่นในเซิฟเวอร์นี้')] });
      return msg.channel.send({
        embeds: [CreateEmbed('info', stripIndent`
      ✅ กำลังเล่น: 
      \`\`\`css
      ${GuildPlayers.queue.current.title} | [${GuildPlayers.queue.current.requester.username}]
      \`\`\`

      ➡️ แทร็กต่อไป:
      \`\`\`css
      ${GuildPlayers.queue.values().next().value ? `${GuildPlayers.queue.values().next().value.title} | [${GuildPlayers.queue.values().next().value.requester.username}]` : 'ไม่มี'}
      \`\`\`
      `)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
