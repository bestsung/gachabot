const { Command, Argument } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class CalDiamondCommand extends Command {
  constructor() {
    super('Caldiamond', {
      aliases: ['diamond','dm'],
      description: {
        content: 'Change music volume',
      },
      category: 'คำนวณ',
      cooldown: 3000,
      args: [
        {
          id: 'diamond',
          type: Argument.range('number', 0, 100000001),
          match: 'rest',
          prompt: {
            start: 'จำนวน __เพชร__ ที่คุณได้รับ?',
            retry: '**⛔ |** คุณป้อนจำนวนไม่ถูกต้อง',
          },
        },

        {
          id: 'money',
          type: Argument.range('number', 0, 100000001),
          match: 'rest',
          prompt: {
            start: 'จำนวน __เงิน__ ที่คุณจ่าย?',
            retry: '**⛔ |** คุณป้อนจำนวนไม่ถูกต้อง',
          },
        },
		
      ],
    });
  }

  async exec(msg, { diamond,money }) {

    //100฿=Diamond?
    let diamond_1 = (diamond / money) * 100;

    //difference
    let difference = (diamond_1 - 366.6) / 366.6;
    let difference1 = difference * 100;
    let limited_float = round(difference1, 2)
	

    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      return msg.channel.send({ embeds: [CreateEmbed('info', `**สรุป**\n[💎] \`${diamond}\`\n[💵] \`${money}฿\`\n\n**ผลลัพธ์**\n[💵] 100฿ = [💎] \`${diamond_1}\`\n\n**สรุป**\n✅ ถูกกว่าเติมเอง \`${limited_float}%\``)] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
