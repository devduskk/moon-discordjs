const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['suggest'],
            enabled: true,
            description: 'Make a suggestion to the server.',
            category: 'Utility',
            usage: '\`suggest\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message) {
      message.channel.send(`Check your DM, ${message.author}! Do you want to cancel sending your suggestion? If so, type \ `cancel \` in your DM.`)
      let server = (await message.author.createDM()).createMessageCollector(a => a.author.id == message.author.id, {
        time: 60000 * 5,
        max: 1
      })
      message.author.send('What is the name of the server you want to send a suggestion to?')
      server.on('collect', async a => {
        let servidor = a.content
        if (['cancel', 'Cancel'].includes(servidor)) return message.author.send('Suggestion submission has been canceled.')
        let serv = (await message.author.createDM()).createMessageCollector(a => a.author.id == message.author.id, {
          time: 60000 * 5,
          max: 1
        })
        message.author.send('What is your nickname on our server?')
        serv.on('collect', async b => {
          let nickname = b.content
          if (['cancel', 'Cancel'].includes(servidor)) return message.author.send('Suggestion submission has been canceled.')
          let nickn = (await message.author.createDM()).createMessageCollector(a => a.author.id == message.author.id, {
            time: 60000 * 5,
            max: 1
          })
          message.author.send(`What is the suggestion you want to send to the server \`${servidor}\`?`)
          nickn.on('collect', async c => {
            let sugestão = c.content
            let suget = (await message.author.createDM()).createMessageCollector(a => a.author.id == message.author.id, {
              time: 60000 * 5,
              max: 1
            })
              message.author.send('You have successfully submitted all your suggestion data!')
              const chan = message.guild.channels.cache.get('CHANNEL ID HERE')
              const embed = new MessageEmbed()
              .setColor(`36393e`)
              .setTitle('A new suggestion has been sent! See the suggestion below:')
              .setDescription(`🎮 Server: \`${servidor}\`\n:speaking_head: Suggestion sent by: \`${nickname}\`\n\n:newspaper: **Suggestion**: \`\`\`\n${sugestão}\n\`\`\``)
              .setFooter(`This suggestion was sent by: ${nickname}(${message.author.tag})`, message.author.displayAvatarURL({dynamic: true}))
          chan.send(embed).then(async (msg) => {
            await msg.react("👍");
            await msg.react("👎");
          })
            })
          })
        })
    }
    }
