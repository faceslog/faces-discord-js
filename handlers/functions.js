const { client } = require("../index.js");
const fs = require('fs');

const ID_REGEX = /[0-9]+/;

async function getGeneric(from, altToId, resolvable, source) {
    if (!source)
        source = client;

    const haystack = source[from],
        matches = resolvable.match(ID_REGEX);
    let g;

    if (matches)
        try { g = haystack.fetch ? await haystack.fetch(matches[0]) : haystack.cache.get(matches[0]); } catch {}; // can fail because names can contain numbers

    if (!g)
        g = haystack.cache.find(elm => elm[altToId] === resolvable);

    return g;
}

module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);

        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
            });
        }

        if (!target)
            target = message.member;

        return target;
    },
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date);
    },
    // Get a channel from and id or name
    getChannel: function(channelResolvable, fromGuild) {
        return getGeneric("channels", "name", channelResolvable, fromGuild);
    },
    getChannels: async function(str, fromGuild) {
        const channels = [],
            elements = str.split(" ");

        if (elements.length) {
            for (const resolvable of elements) {
                const chan = await getChannel(resolvable, fromGuild);
                if (chan)
                    channels.push(chan);
            }
        }

        return channels;
    },
    promptMessage: async function(message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time })
            .then(collected => collected.first() && collected.first().emoji.name);
    },
    makeChannel: function(message, channelName) {
        var guild = message.guild;

        guild.channels.create(channelName, {
            type: 'text',
            permissionOverwrites: [{
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
            ],
            reason: 'New channel added'
        });

    },
    getRoleID: async function(message, roleName) {
        console.log('Test' + message.guild.id + 'name : ' + roleName);
        let role = message.guild.roles.cache.find(role => role.name === `${roleName}`);
        return role;
    }
}