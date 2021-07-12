require('dotenv').config();

const { Client, Collection } = require("discord.js");
const fs = require("fs");

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

const client = new Client({
    disableEveryone: false,
});

module.exports = {
    client
}

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Faces Bot Is Ready, name is ${client.user.username}`);

    client.user.setActivity(`${prefix}help`, {
        type: "STREAMING",
    });
});

client.on("message", async(message) => {

    if (message.author.bot) return;
    if (!message.guild) return;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command)
        command.run(client, message, args);

});

client.login(token);