const { stripIndents } = require('common-tags');

function CreatePrompt(prompt) {
  return stripIndents`
    **❔ |** *${prompt}*
    **🔘 |** *คุณมีเวลา \`30\` วินาที*
    **🔘 |** *พิมพ์ \`cancel\` เพื่อยกเลิก*
    `;
}

module.exports = { CreatePrompt };
