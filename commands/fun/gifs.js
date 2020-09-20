const fetch = require('node-fetch');
const { tenorAPI } = require('../../config.json');

module.exports = {
    name: "gif",
    aliases: ["search-gif", "gifs"],
    category: "fun",
    description: "Provide a query and I will return a gif!",
    usage: "<input>",
    run: (client, message, args) => {

        if (args > 50) {
            return message.reply('Oops what you ask me is too acurate to be found !');
        }

        fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=${args}&limit=1`)
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.channel.send('Failed to find a gif that matched your query');
                // console.error(e);
                return;
            });
    }
}