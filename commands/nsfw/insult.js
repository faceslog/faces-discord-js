const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "insult",
    aliases: ["punchline", "trashtalk"],
    category: "nsfw",
    description: "Generate an a punchline !",
    run: (client, message, args) => {


        if (!message.channel.nsfw) 
        {
            message.react('💢');
            return message.channel.send('NSFW cannot be posted in this channel');
        }

        // thanks to https://evilinsult.com :)
        fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
            .then(res => res.json())
            .then(json => {
                const embed = new MessageEmbed()
                    .setColor('#E41032')
                    .setTitle('Evil Insult')
                    .setDescription(json.insult)
                    .setURL('https://evilinsult.com');
                return message.channel.send(embed);
            })
            .catch(err => {
                message.channel.send('Failed to deliver insult :sob:');
                return console.error(err);
            });


    }
}