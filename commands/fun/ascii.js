const asciify = require('asciify-image');

module.exports = {
    name: "asciime",
    aliases: ["asciify", "ascii"],
    category: "fun",
    description: "Turn your profile avatar into ascii ! &asciime [optional tag someone]",
    usage: "<input>",
    run: (client, message, args) => {

        !message.mentions.users.size ? member = message.author : member = message.mentions.user;

        const image = message.author.displayAvatarURL({ format: 'png' });

        var options = 
        {
            fit: 'box',
            color: false,
            width: 30,
            height: 33
        }

        if (!message.mentions.users.size) 
        {
            asciify(image, options)
             .then(function (asciified) {
                    asciified1 = '```' + asciified + '```'
                    regex = /;/gi
                    message.channel.send(asciified1.replace(regex, " "));
            })
            .catch(function (err) {
                message.channel("Could no asciify the avatar :(")
                console.error(err);
            });
        }
        
        const avatarList = message.mentions.users.map(user => {
            const image = user.displayAvatarURL({ format: 'png' });

            var options = {
                fit: 'box',
                color: false,
                width: 30,
                height: 33
            }

            asciify(image, options)
            .then(function (asciified) {
                asciified1 = '```' + asciified + '```'
                regex0 = /;/gi
                asciified1 = asciified1.replace(regex0, " ")
                message.channel.send(asciified1);
            })
            .catch(function (err) {
                message.channel("Could no asciify the avatar :(")
                console.error(err);
            });
        });

    }
}