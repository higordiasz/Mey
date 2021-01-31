const Discord = require("discord.js");
const config = require('../json/config.json')
const description = require('../json/comandos.json')

module.exports = {
    name: "print",
    aliases: ["pi"],
    description: "Manda prints aleatorios no chat",
    async execute(msg, args, client) {
        if (!args[0]) {
            try {
                const caracteres = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 1, 2, 3, 4, 5, 6, 7, 8, 9];
                let r1 = Math.floor(Math.random() * 26);
                let r2 = Math.floor(Math.random() * 26);
                let r3 = Math.floor(Math.random() * 26);
                let r4 = Math.floor(Math.random() * 26);
                let r5 = Math.floor(Math.random() * 26);
                let r6 = Math.floor(Math.random() * 26);
                let r = caracteres[r1] + caracteres[r2] + caracteres[r3] + caracteres[r4] + caracteres[r5] + caracteres[r6];
                msg.channel.send(`http://prnt.sc/${r}`);
                msg.delete()
            } catch (err) {
                console.log(`Erro ao mandar print: `, err)
            }
        } else {
            try {
                if (args[0] > 5) return msg.reply("O valor não pode ser maior que 5!");
                if (args[0] == 0) return msg.reply("O valor não pode ser 0!");
                let print = args[0];
                const caracteres = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 1, 2, 3, 4, 5, 6, 7, 8, 9];
                let r1, r2, r3, r4, r5, r6, r;
                for (let i = 0; i < print; i++) {
                    r1 = Math.floor(Math.random() * 26);
                    r2 = Math.floor(Math.random() * 26);
                    r3 = Math.floor(Math.random() * 26);
                    r4 = Math.floor(Math.random() * 26);
                    r5 = Math.floor(Math.random() * 26);
                    r6 = Math.floor(Math.random() * 26);
                    r = caracteres[r1] + caracteres[r2] + caracteres[r3] + caracteres[r4] + caracteres[r5] + caracteres[r6];
                    msg.channel.send(`http://prnt.sc/${r}`);
                }
                msg.delete()
            } catch (err) {
                console.log(`Erro ao mandar print: `, err)
            }
        }
    }
}