const Event = require('./../../structures/Event');
const ms = require('ms');

module.exports = class extends Event {

    async run(message) {
        const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

        const prefix = message.content.match(mentionRegexPrefix) ?
            message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.aliases.get(cmd.toLowerCase()));
        if (command) {

            if (!command.enabled) return;

            if (command.cooldown) {
                if (this.client.cooldown.has(message.author.id)) return;
                this.client.cooldown.add(message.author.id);
                setTimeout(() => {
                    this.client.cooldown.delete(message.author.id);
                }, command.cooldown)
            }

            if (command.guildOnly && !message.guild)
                return message.reply(`This command could not be executed because it can only be used on servers.`).then(i => i.delete({ timeout: 5000 }));

            if (command.nsfw && !message.channel.nsfw)
                return message.reply(`This command could not be executed because it can only be used on NSFW channels`).then(i => i.delete({ timeout: 5000 }));

            if (command.args && !args.length)
                return message.reply(`It is necessary to enter the parameters for executing the command. ${command.usage ?
                command.usage : 'No parameters were found for this command.'}`).then(i => i.delete({ timeout: 5000 }))

            if (command.ownerOnly && !this.client.owners.includes(message.author.id)) return;

            command.run(message, args);
        }

        }
    }
