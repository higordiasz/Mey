const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require("./functions")

module.exports = {
    name: "logmonster",
    aliases: [],
    description: "Dar um console.log na db de monstros",
    //m.addm name image level-max level-min vida_max vida_min xp-man xp-min ataque-max ataque-min defesa-max defesa-min categoria
    //t.addm Rato https://i.imgur.com/OLIMGdh.png 5 1 30 15 110 50 15 5 10 5 1
    async execute(msg, args, client) {
        if (msg.author.id != config.OWNER) return;
        if (!args[0]) {
            console.log(db.get(`rpg.monster.dados`))
        }

        if (args[0] == 'delete') {
            db.delete(`rpg.monster`)
        }

        if (parseInt(args[0]) > 0) {
            //db.delete(`rpg.monster.dados.${args[0]}`)
            let lista = db.get(`rpg.monster.dados.lista`)
            let categoria = db.get(`rpg.monster.dados.categoria.${args[1]}`)
            lista.splice(lista.indexOf(args[0]), 1);
            console.log(lista)
            categoria.splice(categoria.indexOf(args[0]), 1);
            console.log(categoria)
        }

        if (args[0] == 'mostrar') {
            let mostro = func.returnmonster(1)
            msg.reply(`Name - ${mostro.nome} / level - ${mostro.level} / vida - ${mostro.vida} / xp - ${mostro.xp} / ataque - ${mostro.ataque} / defesa - ${mostro.defesa} / speed - ${mostro.speed} / dinheiro - ${mostro.dinheiro} `)
        }
    }
}