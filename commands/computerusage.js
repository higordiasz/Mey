const Discord = require('discord.js')
const config = require('../json/config.json')
const fs = require('fs');
const path = require('path');
const folder = `./`

module.exports = {
    name: "computerusage",
    aliases: [],
    description: "EnvEnvia os dados de uso de CPU, RAM e HD para o channel.",
    execute(msg, args, client) {
        if ((msg.author.id != config.OWNER) && (msg.author.id != config.OWNER2)) return msg.channel.send(`Apenas meus criadores podem usar esse comando!!`)
        function getAllFiles(folder) {
            return new Promise((resolve, reject) => {
                fs.readdir(folder, (err, files) => {
                    if (err) return reject(err);
                    const filesWithPath = files.map(f => path.join(folder, f));
                    Promise.all(filesWithPath.map(getFileSize)).then(sizes => {
                        const sum = sizes.reduce(addValues, 0);
                        resolve(sum);
                    });
                });
            });
        }

        function getFileSize(file) {
            return new Promise((resolve, reject) => {
                fs.stat(file, (err, stat) => {
                    if (err) return reject(err);
                    if (stat.isDirectory()) getAllFiles(file).then(resolve);
                    else resolve(stat.size);
                });
            });
        }

        function addValues(sum, val) {
            return sum + val;
        }

        function formatBytes(bytes) {
            if (bytes < 1024) return bytes + " Bytes";
            else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " Kb";
            else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " Mb";
            else return (bytes / 1073741824).toFixed(3) + " GB";
        }

        getAllFiles(folder)
            .then(sum => {
                const status = new Discord.MessageEmbed()
                    .setTitle('⚙ Armazenamento')
                    .setColor('RANDOM')
                    .addField('__CPU__:', `**${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%**`)
                    .addField('__RAM__:', `**${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB**`)
                    .addField('__HD__:', `**${formatBytes(sum)}**`)
                msg.reply(status)
            })
            .catch(e => console.log(e));

    }
}