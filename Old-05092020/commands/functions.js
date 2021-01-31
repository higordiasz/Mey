const Discord = require('discord.js')
const imgur = require('imgur')
const fetch = require('node-fetch')

module.exports = {
    args: async function (args) {
        let text = args.join(" ")
        return text;
    },
    isADM: async function (member) {
        return (member.hasPermission('ADMINISTRATOR'));
    },
    rsend: async function (msg, message) {
        return msg.reply(message);
    },
    send: async function (msg, message) {
        return msg.channel.send(message);
    },
    timer: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    ialbum: async function (album) {
        let a = await imgur.getAlbumInfo(album)
            .then(function (json) {
                return json;
            })
            .catch(function (err) {
                console.error(err.message);
                return;
            });
        return a;
    },
    rand: async function (max) {
        return Math.floor(Math.random() * max)
    }
}