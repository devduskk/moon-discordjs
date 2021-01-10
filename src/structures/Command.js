const { Permissions } = require("discord.js");

module.exports = class Command {

    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.enabled = options.enabled || false;
        this.description = options.description || "Descrição inespecificada.";
        this.category = options.category || "Miscelâneo.";
        this.usage = `${this.client.prefix}${this.name}: ${options.usage || ''}`.trim();
        this.botPermissions = new Array();
        this.memberPermissions = new Array();
        this.guildOnly = options.guildOnly || false;
        this.ownerOnly = options.ownerOnly || false;
        this.nsfw = options.nsfw || false;
        this.args = options.args || false;
        this.cooldown = options.cooldown || false;
    }

    async run(message, args) {
        throw new Error(`O comando ${this.name} não especificou um método de inicialização.`)
    }
}