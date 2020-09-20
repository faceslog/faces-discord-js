const { MessageEmbed } = require('discord.js');
const math = require('mathjs');


module.exports = {
    name: "math",
    aliases: ['solve', 'calc'],
    category: "utility",
    description: "I'll do your math homework! &math [equation]",
    usage: "<input>",
    run: (client, message, args) => {

        if (!args[0]) {
            return message.reply('Please provide me an equation to solve !');
        }

        var equation = args;
        try {
            var solution = math.evaluate(equation);
        } catch (err) {
            return message.channel.send(`❎ | I couldn\'t solve that equation! \`${err}\``)
        }

        const embed = new MessageEmbed()
            .setColor('#767CC1')
            .addField('**📥 Expression**', `\`\`\`${equation}\`\`\``)
            .addField('**📤 Result**', `\`\`\`${solution}\`\`\``);
        return message.channel.send({ embed })

    }
}