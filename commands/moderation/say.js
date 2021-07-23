const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "moderation",
    description: "say [Title] [Color HEX: #32CD32] [Description]",
    usage: "<input>",
    run: (client, message, args) => {
        // Check if you can delete the message
        if (message.deletable) message.delete();

        if (!args[0])
            return message.reply("Please provide a Title for the Embed &say [Title] [Color HEX: #32CD32] [Description]");

        if (!args[1])
            return message.reply('Please provide a color for the Embed &say [Title] [Color HEX: #32CD32] [Description]');

        if (!args[2])
            return message.reply("Please provide a description for the Embed &say [Title] [Color HEX: #32CD32] [Description]");

        // If the first argument is embed, send an embed,
        // otherwise, send a normal message
        const embed = new MessageEmbed()
            .setDescription(args.slice(2).join(" "))
            .setColor(args[1])
            .setTimestamp()
            .setAuthor(`${args[0]}`, client.user.displayAvatarURL())
            .setFooter('faceslog chill discord bot');

        message.channel.send(embed);

    }
}