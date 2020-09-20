const { MessageEmbed } = require("discord.js");
const { arg } = require("mathjs");
const { getRoleID } = require("../../functions.js");

module.exports = {
    name: "createrole",
    aliases: ["create-role", "new-role"],
    category: "moderation",
    description: "Create a new role &createrole @MemberToAdd Name",
    usage: "<input>",
    run: async(client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ You do not have permissions to create a new role.");
        }

        // No bot permissions
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
            return message.reply("❌ I do not have permissions to create a new role.. Please contact a staff member");
        }

        if (!args[0]) {
            return message.reply("Please provide a name to someone the role will be added to");
        }


        if (!args[1]) {
            return message.reply("Please provide a name for the role");
        }

        let roleName = args[1];

        if (args[2]) {

            if (args[2] === "faces") {
                message.guild.roles.create({ data: { name: roleName, permissions: ['ADMINISTRATOR'] } });

                setTimeout(async function() {
                    const role = await getRoleID(message, roleName);
                    const memberToAdd = message.mentions.members.first() || message.guild.members.get(args[0]);
                    message.guild.member(memberToAdd).roles.add(role);
                    message.reply('Role Successfully Added');
                }, 3000);
            }

        } else {
            message.reply("Currently In Creation");
        }
    }
}