const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['announce'],
            enabled: true,
            description: 'Place an announce on Discord.',
            category: 'Moderative',
            usage: '\`announce\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message) {
      if(!message.member.hasPermission('ADMINISTRATOR')) {
          message.reply('Only those who have the **ADMINISTRATOR** permission can use this command.')
        } else {

      message.channel.send(`Check your DM, ${message.author}! Do you want to cancel sending your ad? If so, type \`cancel \` in your DM.`)
      let server = (await message.author.createDM()).createMessageCollector(a => a.author.id == message.author.id, {
        time: 60000 * 5,
        max: 1
      })
      message.author.send('What is the headline of the announce you want to send?')
      server.on('collect', async a => {
        let headline = a.content
        if (['cancel', 'Cancel'].includes(server)) return message.author.send('Announce submission has been canceled.')
        let titu = (await message.author.createDM()).createMessageCollector(a => a.author.id == message.author.id, {
          time: 60000 * 5,
          max: 1
        })
        message.author.send('What is the description of the announce you want to send?')
        titu.on('collect', async b => {
          let description = b.content
          if (['cancel', 'Cancel'].includes(server)) return message.author.send('Announce submission has been canceled.')
          let descr = (await message.author.createDM()).createMessageCollector(a => a.author.id == message.author.id, {
            time: 60000 * 5,
            max: 1
          })
          message.author.send(`Enter the ID of the channel that will send the announce here.`)
          descr.on('collect', async c => {
            let IDchan = c.content
            let idc = (await message.author.createDM()).createMessageCollector(a => a.author.id == message.author.id, {
              time: 60000 * 5,
              max: 1
            })
              message.author.send('You have successfully submitted all your announce data!')
              const chan = message.guild.channels.cache.get(`${IDchan}`)
              const embed = new MessageEmbed()
              .setColor(`36393e`)
              .setAuthor(`${headline}`)
              .setDescription(`${description}`)
              .setTimestamp(new Date())
          chan.send(embed)
            })
          })
        })
    }
    }
}
