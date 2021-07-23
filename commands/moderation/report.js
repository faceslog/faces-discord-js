const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getChannel, makeChannel } = require("../../handlers/functions.js");

const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention, id>",
    run: async(client, message, args) => {
        // If the bot can delete the message, do so
        if (message.deletable) message.delete();

        // Either a mention or ID
        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // No person found
        if (!rMember)
            return message.reply("Couldn't find that person?")

        // The member has BAN_MEMBERS or is a bot
        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.reply("Can't report that member");

        // If there's no argument
        if (!args[1])
            return message.reply("Please provide a reason for the report");

        // Create a new channel for the ticket
        let channelName = "report-" + random(6);
        makeChannel(message, channelName);

        setTimeout(async function() {

            const channel = await getChannel(channelName, message.guild);
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL)
                .setAuthor("Reported member", rMember.user.displayAvatarURL)
                .setDescription(stripIndents `**> Member:** ${rMember} (${rMember.user.id})
            **> Reported by:** ${message.member} (${message.member.id})
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);
            return channel.send(embed);
        }, 3000);
    }
}