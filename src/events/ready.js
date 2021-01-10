module.exports = (client) => {
    console.log(`[API] Logged as ${client.user.tag}`);

    const activities = [
        `purchase a product in #ticket-process.`,
        `our customers`,
        `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} members`
    ];

    let i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
};
