const Command = require('../../structures/Command.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['balance'],
            enabled: true,
            description: 'Check how much money you have.',
            category: 'Economy',
            usage: '\`balance\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new MessageEmbed()
  .setColor("36393e")
  .setAuthor(`Monetary Balance`)
  .setDescription(`> :coin: Money in hands: **$ ${bal}**\n> :credit_card: Bank: **$ ${bank}**`);
  message.channel.send(moneyEmbed)
    }
}
