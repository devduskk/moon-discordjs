const Command = require('../../structures/Command.js');
const db = require('quick.db');
const ms = require('parse-ms');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['work'],
            enabled: true,
            description: 'Performs a job to receive money.',
            category: 'Economy',
            usage: '\`work\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message) {
    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 1500000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));

        let timeEmbed = new MessageEmbed()
        .setColor("36393e")
        .setDescription(`Wait a while to work again, you're too tired.\n> ⏰ Time: **${time.minutes}m** **${time.seconds}s** `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Writer','Astronaut','Chef','Mechanical','Officer','Designer','Farmer','Salesman','Actor']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 500) + 1;
        let embed1 = new MessageEmbed()
        .setColor("36393e")
        .setDescription(`> You worked as **${replies[result]}** and received:\n> :coin: **$ ${amount}**`);
        message.channel.send(embed1)

        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
    }
}
