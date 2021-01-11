const Command = require('../../structures/Command.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ping'],
            enabled: true,
            description: 'Performs a calculation to obtain instance latency.',
            category: 'Utility',
            usage: '\`ping\`',
            guildOnly: false,
            ownerOnly: true,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message) {
        message.channel.send(`🏓 Pooong! \`${this.client.ws.ping.toFixed(0)}ms.\``)
    }
}
