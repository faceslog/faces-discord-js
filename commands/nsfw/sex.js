const Pornsearch = require('pornsearch');

module.exports = {
    name: "sex",
    aliases: ["sexgif", "porngif"],
    category: "nsfw",
    description: "Provide a query and I will return a hot gif!",
    usage: "<input>",
    run: (client, message, args) => {


        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send('NSFW cannot be posted in this channel');
        }

        if (!args[0]) {
            return message.reply('Please provide me something to search for !');
        }

        let drivers = ['pornhub'];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        const plugin = drivers[getRandomInt(drivers.length)];

        const Searcher = new Pornsearch(args[0], driver = plugin);

        let number = Math.floor(Math.random() * 20);

        try {
            Searcher.gifs()
                .then(gifs => message.channel.send(gifs[number].url));

            return null;

        } catch (err) {
            return message.channel.send(`No results found for **${s}**`);
        }
    }
}