const Command = require('../../structures/Command.js');
const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['deposit'],
            enabled: true,
            description: 'Make a deposit.',
            category: 'Economy',
            usage: '\`deposit\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
let user = message.author;

let member = db.fetch(`money_${message.guild.id}_${user.id}`)
let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

if (args[0] == 'all') {
  let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)

  let embedbank = new MessageEmbed()
  .setColor('36393e')
  .setDescription(":x: You haven't money to deposit.")

  if(money === 0) return message.channel.send(embedbank)

  db.add(`bank_${message.guild.id}_${user.id}`, money)
  db.subtract(`money_${message.guild.id}_${user.id}`, money)
  let embed5 = new MessageEmbed()
.setColor("36393e")
.setDescription(`:white_check_mark: You have successfully deposited all your money to your bank!`);
message.channel.send(embed5)

} else {

let embed2 = new MessageEmbed()
.setColor("36393e")
.setDescription(`:thinking: Specify an amount you want to deposit.`);

if (!args[0]) {
    return message.channel.send(embed2)
    .catch(err => console.log(err))
}
let embed3 = new MessageEmbed()
.setColor("36393e")
.setDescription(`:x: You can't deposit negative money.`);

if (message.content.includes('-')) {
    return message.channel.send(embed3)
}
let embed4 = new MessageEmbed()
.setColor("36393e")
.setDescription(`:x: You don't have that much money.`);

if (member < args[0]) {
    return message.channel.send(embed4)
}

let embed5 = new MessageEmbed()
.setColor("36393e")
.setDescription(`:white_check_mark: You deposited **$ ${args[0]}** to your bank successfully!`);

message.channel.send(embed5)
db.add(`bank_${message.guild.id}_${user.id}`, args[0])
db.subtract(`money_${message.guild.id}_${user.id}`, args[0])
}
    }
}
