const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "8ball",
    aliases: ["8ball", "8"],
    category: "fun",
    description: "Ask me something",
    usage: "<your question>",
    run: (client, message, args) => {

        if (!args[0]) {
            return message.reply('Please ask me something !');
        }
        
        let question = args.join(" ");
        
        if (!question.includes("?"))return message.channel.send("Since you are asking a question please put a **?** at the end");

        const replies = [ 'Yes', 'No', 'I dont\'t know', 'Maybe', 'Of course', 'To be honest I don\'t care', '... Ok shut up your question is as trash as you' ];
        
        const reponse = Math.floor(Math.random() * replies.length);       

        const embed = new MessageEmbed()
            .setColor('#767CC1')
            .addField('**❓ Question**', `\`\`\`${question}\`\`\``)
            .addField('**📤 Answer**', `\`\`\`${replies[reponse]}\`\`\``);
        return message.channel.send({ embed })
    }
}