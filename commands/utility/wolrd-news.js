const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const newsAPI = process.env.NEWS_API;

module.exports = {
    name: "world-news",
    aliases: ['global-news', 'reuters'],
    category: "utility",
    description: "Replies with the 5 latest world news headlines",
    usage: "<input>",
    run: async(client, message, args) => {

        // powered by NewsAPI.org
        try 
        {
            const response = await fetch(
                `https://newsapi.org/v2/top-headlines?sources=reuters&pageSize=5&apiKey=${newsAPI}`
            );

            const json = await response.json();
            const articleArr = json.articles;

            let processArticle = article => {
                const embed = new MessageEmbed()
                    .setColor('#FF4F00')
                    .setTitle(article.title)
                    .setURL(article.url)
                    .setAuthor(article.author)
                    .setDescription(article.description)
                    .setThumbnail(article.urlToImage)
                    .setTimestamp(article.publishedAt)
                    .setFooter('powered by NewsAPI.org');
                return embed;
            };

            async function processArray(array) {
                for (const article of array) {
                    const msg = await processArticle(article);
                    message.channel.send(msg);
                }
            }

            await processArray(articleArr);

        } catch (e) 
        {
            message.channel.send('Something failed along the way');
            console.error(e);
        }
    }
}