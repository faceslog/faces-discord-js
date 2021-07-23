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

        let equation = args;
        let solution = null;

        try
        {
            solution = math.evaluate(equation);
        }
        catch (err) 
        {
            return message.channel.send(`❎ | I could not solve that equation! \`${err}\``)
        }

        const embed = new MessageEmbed()
            .setColor('#767CC1')
            .addField('**📥 Expression**', `\`\`\`${equation}\`\`\``)
            .addField('**📤 Result**', `\`\`\`${solution}\`\`\``);
        return message.channel.send({ embed })

    }
}