module.exports = {
    name: "clear",
    aliases: ["delete-messages", "bulk-delete"],
    category: "moderation",
    description: "Delete amount of recent messages",
    usage: "<input>",
    run: (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_CHANNELS") && !message.member.hasPermission("MANAGE_MESSAGES")) 
        {
            return message.reply("❌ You do not have permissions to delete message. Please contact a staff member");
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_MESSAGES")) 
        {
            return message.reply("❌ I do not have permissions to delete messages. Please contact a staff member");
        }

        if (!args[0]) 
        {
            return message.reply("Please provide a number of messages to delete. Max amount is 100");
        }

        let numberOfMessagesToDelete = args[0];
        numberOfMessagesToDelete++;

        if (isNaN(numberOfMessagesToDelete) === false) 
        {

            if (numberOfMessagesToDelete < 0 || numberOfMessagesToDelete > 100) 
            {
                return message.reply("The maximum number of message you can delete is up to 100 !");
            }

            message.channel
                .bulkDelete(numberOfMessagesToDelete)
                .catch(e => {
                    console.error(e);
                    return message.reply(
                        'Something went wrong when trying to delete messages :( maybe messages are too old to be deleted ?'
                    );
                });
        } 
        else 
        {
            return message.reply("Please provide a right number of messages to delete");
        }

    }
}