const { MessageEmbed } = require('discord.js');
const genius = require('genius-lyrics');
const geniusApi = process.env.GENIUS_API;


module.exports = {
    name: "lyrics",
    aliases: ['genius', 'song'],
    category: "utility",
    description: "I'll search for the lyric of a specific song: &genius [equation]",
    usage: "<input>",
    run: (client, message, args) => {

        if (!args[0]) return message.reply('Please provide me a song to search for !');
            
        const gClient = new genius.Client(geniusApi);

        gClient.songs.search(args.slice(0).join(" "))
        .then(res => {
            
            const song = res[0];
            console.log(JSON.stringify(song));
            const embed = new MessageEmbed()
            .setColor('#FFFF00')
            .addField('**🎧 Artist:**', `\`\`\`${song.artist.name}\`\`\``)
            .addField('**🎵 Song Title**', `\`\`\`${song.title}\`\`\``)
            .setDescription(`<${song.url}>`)
            .setImage(song.thumbnail)
            return message.channel.send({ embed })

        })
        .catch(err => {
            message.reply("Did not found the song you asked for ! Sorry :( ");
            console.error(err);
        });
    }
}