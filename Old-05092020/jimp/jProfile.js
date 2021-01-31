const jimp = require('jimp')
const Discord = require('discord.js')
const Jimp = require('jimp');
const { FONT_SANS_10_BLACK } = require('jimp');
const { FONT_SANS_32_WHITE } = require('jimp');
const { FONT_SANS_16_WHITE } = require('jimp');

module.exports = {
    profile: async function (client, msg, val, user) {
        try {
            let fundo
            let font = await Jimp.loadFont('./font/pixelart.fnt')
            switch (val.fundo) {
                case 'azul':
                    fundo = await jimp.read('./img/maleprofile.jpg')
                    break;
                case 'rosa':
                    fundo = await jimp.read('./img/femaleprofile.jpg')
                    break;
                default:
                    fundo = await jimp.read('./img/maleprofile.jpg')
                    break;
            }
            let point = await jimp.read('./img/point.png')
            let vida = Math.floor(((parseInt(val.vida_a) * 100) / val.vida_m) / 10)
            let positions = [290, 300, 310, 320, 330, 340, 350, 360, 370, 380]
            point.resize(7, 9)
            for (let i = 0; i < vida; i++) {
                fundo.composite(point, positions[i], 91)
            }
            await Jimp.read(user.displayAvatarURL({ format: 'png' })).then(avatar => {
                avatar.resize(156, 156)
                fundo.print(font, 30, 195, user.username.substring(0, 7))
                //fundo.print(font_v, 300, 80, `${val.vida_a} - ${val.vida_m}`)
                fundo.print(font, 215, 18, 'Level')
                fundo.print(font, 385, 18, val.level)
                fundo.print(font, 215, 220, 'Defesa')
                fundo.print(font, 215, 185, 'Speed')
                fundo.print(font, 215, 150, 'Magia')
                fundo.print(font, 215, 115, 'Ataque')
                fundo.print(font, 385, 115, val.ataque)
                fundo.print(font, 385, 150, val.magia)
                fundo.print(font, 385, 185, val.speed)
                fundo.print(font, 385, 220, val.defesa)
                fundo.composite(avatar, 30, 30)
                fundo.write(`./img/${msg.guild.id}/${user.id}.png`)
            })
            let arq = new Discord.MessageAttachment(`./img/${msg.guild.id}/${user.id}.png`)
            msg.channel.send(`${msg.author}`, arq)
        } catch (err) {
            console.log(err)
        }
    }
}