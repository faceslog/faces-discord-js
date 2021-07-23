const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../handlers/functions.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
    run: async(client, message, args) => {

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) return message.reply("Please provide a person to kick.");

        // No reason
        if (!args[1]) return message.reply("Please provide a reason to kick.");

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.reply("❌ You do not have permissions to kick members. Please contact a staff member");

        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS"))
            return message.reply("❌ I do not have permissions to kick members. Please contact a staff member");

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toKick) return message.reply("Couldn't find that member, try again");
   
        // Can't kick yourself
        if (toKick.id === message.author.id) return message.reply("You can't kick yourself...");
 
        // Check if the user's kickable
        if (!toKick.kickable) return message.reply("I can't kick that person due to role hierarchy, I suppose.");

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .setDescription(stripIndents `**> Kicked member:** ${toKick} (${toKick.id})
            **> Kicked by:** ${message.member} (${message.member.id})
            **> Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to kick ${toKick}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅")
            {
                await msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Well.... the kick didn't work out. Here's the error ${err}`);
                    });

                message.reply(embed);
            }
            else if (emoji === "❌")
            {
                await msg.delete();
                message.reply(`Kick canceled.`).then(m => m.delete());
            }
        });
    }
};