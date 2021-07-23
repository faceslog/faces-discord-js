const { MessageEmbed } = require("discord.js");

const botInv = process.env.BOT_INV;
const discordInv = process.env.DISCORD_INV;

module.exports = {
    name: "invite",
    category: "info",
    description: "Give you an invite link for the bot",
    run: async(client, message, args) => {

        const embed = new MessageEmbed()
            .setDescription("Invite me to your Discord:")
            .addField('Invite Link:', `[Click Here](${botInv})`, true)
            .addField('Discord Link:', `[Click Here](${discordInv})`, true)
            .setColor("#d74a08")
            .setTimestamp()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setFooter('faceslog discord bot');
        message.reply(embed);

    }
}