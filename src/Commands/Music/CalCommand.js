const { Command, Argument } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class CalCommand extends Command {
  constructor() {
    super('Cal', {
      aliases: ['firepoint','fp','firepoints'],
      description: {
        content: 'Change music volume',
      },
      category: 'คำนวณ',
      cooldown: 3000,
      args: [
        {
          id: 'glowstick',
          type: Argument.range('number', 0, 100000001),
          match: 'rest',
          prompt: {
            start: 'คุณมี __แท่งไฟ__ จำนวนเท่าไหร่?',
            retry: 'คุณป้อนจำนวนไม่ถูกต้อง',
          },
        },

        {
          id: 'billboard',
          type: Argument.range('number', 0, 100000001),
          match: 'rest',
          prompt: {
            start: 'คุณมี __ป้ายไฟ__ จำนวนเท่าไหร่?',
            retry: '**⛔ |** คุณป้อนจำนวนไม่ถูกต้อง',
          },
        },

        {
          id: 'chicken',
          type: Argument.range('number', 0, 100000001),
          match: 'rest',
          prompt: {
            start: 'คุณมี __ไก่น่ารัก__ จำนวนเท่าไหร่?',
            retry: '**⛔ |** คุณป้อนจำนวนไม่ถูกต้อง',
          },
        },

        {
          id: 'balloon',
          type: Argument.range('number', 0, 100000001),
          match: 'rest',
          prompt: {
            start: 'คุณมี __ลูกโป่ง__ จำนวนเท่าไหร่?',
            retry: '**⛔ |** คุณป้อนจำนวนไม่ถูกต้อง',
          },
        },

        {
          id: 'price',
          type: Argument.range('number', 0, 100000001),
          match: 'rest',
          prompt: {
            start: 'เรท__ราคา__/10,000แต้ม?',
            retry: '**⛔ |** คุณป้อนจำนวนไม่ถูกต้อง',
          },
        },

      ],
    });
  }

  async exec(msg, { glowstick,billboard,chicken,balloon,price }) {

    //Firepoints
    let glowstick_firepoints = glowstick*50;
    let billboard_firepoints = billboard*200;
    let chicken_firepoints = chicken*30;
    let balloon_firepoints = balloon*1000;
    let firepoints = glowstick_firepoints + billboard_firepoints + chicken_firepoints + balloon_firepoints;

    //Flowerpoints
    let glowstick_flowerpoints = glowstick*5;
    let billboard_flowerpoints = billboard*10;
    let chicken_flowerpoints = chicken*100;
    let balloon_flowerpoints = balloon*50;
    let flowerpoints = glowstick_flowerpoints + billboard_flowerpoints + chicken_flowerpoints + balloon_flowerpoints;

    //TotalPrice
    let total_price = (firepoints/10000)*price;


    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      return msg.channel.send({ embeds: [CreateEmbed('info', `**รายการ**\n🔦 - แท่งไฟ x\`${glowstick}\`\n🖼️ - ป้ายไฟ x\`${billboard}\`\n🐣 - ไก่น่ารัก x\`${chicken}\`\n🎈 - ลูกโป่ง x\`${balloon}\`\n\n**แต้มที่ได้รับ**\n🔥 \`+${firepoints}\` **|** 🌹 \`+${flowerpoints}\`\n\n**ราคา** \`(เรท:${price}฿)\`\n**💵 | **\`${total_price}\`฿`)] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | เกิดข้อผิดพลาด')] });
    }
  }
};
