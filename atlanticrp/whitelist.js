const Discord = require('discord.js');
const mongoose = require('mongoose');
const VDM = mongoose.model('VDM');
const RDM = mongoose.model('RDM');
const SAFEZ = mongoose.model('SAFEZ');
const POWER = mongoose.model('POWER');
const META = mongoose.model('META');
const COMBATL = mongoose.model('COMBATL');
const AMV = mongoose.model('AMV'); //Amor a Vida
const ALEATORIOONE = mongoose.model('ALEATORIOONE');
const ALEATORIOTWO = mongoose.model('ALEATORIOTWO');
const ALEATORIOTHREE = mongoose.model('ALEATORIOTHREE');
const WL = mongoose.model('WL');
const { PORCENT, COLOR, OWNER, rwl, wlCategoria, wlChannel } = require('../json/config-wl.json');
const { Reprovado, Aprovado, LiberarID, CheckID } = require('../controller/wl-controller');
const db = require('quick.db');
const moment = require('moment');

module.exports = {
    name: "whitelist",
    aliases: ["wl"],
    description: "Processo de WhiteList Atlantic City",
    async execute(msg, args, client) {
        if (msg.channel.id != wlChannel) return await msg.delete();
        Date.prototype.addHours = function (h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }
        Date.prototype.retString = function () {
            var today = this;
            var day = today.getDate() + "";
            var month = (today.getMonth() + 1) + "";
            var year = today.getFullYear() + "";
            var hour = today.getHours() + "";
            var minutes = today.getMinutes() + "";
            var seconds = today.getSeconds() + "";

            day = checkZero(day);
            month = checkZero(month);
            year = checkZero(year);
            hour = checkZero(hour);
            minutes = checkZero(minutes);
            seconds = checkZero(seconds);

            return (day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds);

            function checkZero(data) {
                if (data.length == 1) {
                    data = "0" + data;
                }
                return data;
            }
        }
        let pontos = 0;
        let maxPontos = 10;
        let ant = await WL.findOne({ id: msg.author.id });
        if (ant == null) {
            ant = new WL({
                id: msg.author.id,
                passaport: "sn",
                nome: "sn",
                aprovado: false,
                aberto: false,
                aguardando: false,
                next: "20/05/2021",
                tentativas: 0
            });
            await ant.save();
        }
        const sleep = async function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const ramdomNumber = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        let shuffle = function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        if (ant == null) return console.log(`\u001b[32m`, "Erro na função de WhiteList");
        if (ant.aberto) return msg.reply(" Já existe uma whitelist aberta, caso de erro entre em contato com o Secretário Geral de Cidadania");
        if (ant.aprovado) return msg.reply("Já foi aprovado no processo de whitelist, procure o Secretario Geral de Cidadania");
        if (ant.tentativas > 0) {
            if (!moment(moment.now()).isAfter(moment(ant.next, "dd-MM-yyyy hh:mm:ss"))) {
                return await msg.reply("Deve esperar para tentar novamente.").then(async (m) => {
                    await sleep(10000);
                    try {
                        await m.delete();
                        await msg.delete();
                    } catch { }
                });
            }
        }
        ant.tentativas += 1;
        ant.aberto = true;
        await ant.save();
        let count = db.get('wl.count') != null ? db.get('wl.count') : 0;
        let channel = await msg.guild.channels.create(`📝┇ᴡʜɪᴛᴇʟɪsᴛ-${count + 1}`);
        channel.setParent(wlCategoria);
        channel.updateOverwrite(msg.guild.me, {
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: true,
            MANAGE_ROLES: true,
        })
        channel.updateOverwrite(msg.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        });
        channel.updateOverwrite(msg.guild.roles.cache.get('742451983683682464'), {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        });
        channel.updateOverwrite(msg.guild.roles.cache.get('742451983683682463'), {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        });
        channel.updateOverwrite(msg.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        });
        db.set('wl.count', (count + 1))
        try {
            let avatar = client.user.displayAvatarURL({ format: 'png' });
            let embed = new Discord.MessageEmbed()
                .setTitle('White List')
                .setColor(COLOR)
                .setDescription(`Bem-Vindo ao processo de White List da Atlantic City !!!\n\nPara prosseguir tenha em mãos seu 'PASSAPORTE'(id) e sua 'IDENTIDADE'(nome)`)
                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                .setFooter(`Atlantic City`, avatar);
            let m1 = await channel.send(msg.author, embed);
            let m99 = await channel.send("Estou carregando a whitelist, aguarde um pouco...");
            let listRDM = await RDM.find({});
            let listVDM = await VDM.find({});
            let listSAFEZ = await SAFEZ.find({});
            let listAMV = await AMV.find({});
            let listPOWER = await POWER.find({});
            let listMETA = await META.find({});
            let listCOMBATL = await COMBATL.find({});
            let listALEATORIOONE = await ALEATORIOONE.find({});
            let listALEATORIOTWO = await ALEATORIOTWO.find({});
            let listALEATORIOTHREE = await ALEATORIOTHREE.find({});
            let rdm = listRDM.length > 0 ? listRDM(ramdomNumber(0, listRDM.length)) : new RDM({ pergunta: "Qual das alternativas abaixo se encaixa como RDM(Random Deathmatch) ?", correta: "Atirar em pessoas aleatórias na praça", alt1: "Se vingar da pessoa que te esfaqueou", alt2: "Andar de bicicleta", alt3: "Sair cantarolando pela praça" });
            let vdm = listVDM.length > 0 ? listVDM(ramdomNumber(0, listVDM.length)) : new VDM({ pergunta: "Qual das alternativas abaixo se encaixa como VDM(Vehicle Deathmatch) ?", correta: "Atropelar uma pessoa na praça e sair sem prestar socorro", alt1: "Atropelar um pedestre na praça e parar para chamar a emergência", alt2: "Andar de cavalo encima da calçada", alt3: "Bater o carro e continuar dirigindo" });
            let safez = listSAFEZ.length > 0 ? listSAFEZ(ramdomNumber(0, listSAFEZ.length)) : new SAFEZ({ pergunta: "Qual desses local é considerado uma Safe Zone ?", correta: "Hospital", alt1: "Farme Ilegal", alt2: "Loja de Ração", alt3: "Loja de Roupas" });
            let amv = listAMV.length > 0 ? listAMV(ramdomNumber(0, listAMV.length)) : new AMV({ pergunta: "Qual das alternativas a seguir define melhor o Amor a Vida ?", correta: "Sempre prezar pela sua segurança e não fazer nada que coloque sua vida em risco", alt1: "Subir em um prédio alto e pular sem paraquedas", alt2: "Fazer manobras perigosas com a moto", alt3: "Se jogar de um avião" });
            let power = listPOWER.length > 0 ? listPOWER(ramdomNumber(0, listPOWER.length)) : new POWER({ pergunta: "Estando em uma perseguição da policia, caso eu capote o carro, fure 2 pneus e continue dando fuga. Seria considerado ?", correta: "Power Gaming", alt1: "Random Deathmatch", alt2: "Vehicle Deathmatch", alt3: "Meta Gaming" });
            let meta = listMETA.length > 0 ? listMETA(ramdomNumber(0, listMETA.length)) : new META({ pergunta: "Qual a definição de Meta Gaming ?", correta: "Usar um conhecimento obtido fora do RP para se beneficiar de alguma forma", alt1: "Sair do RP em uma perseguição", alt2: "Andar de trator na cidade", alt3: "Comprar uma casa" });
            let combatl = listCOMBATL.length > 0 ? listCOMBATL(ramdomNumber(0, listCOMBATL.length)) : new COMBATL({ pergunta: "Caso eu saia da cidade no meio de uma ação para não ser pego pela policia seria considerado ?", correta: "Combat Logging", alt1: "Dark RP", alt2: "Fuga Limpa", alt3: "Problema da Staff" });
            let aleatorio1 = listALEATORIOONE.length > 0 ? listALEATORIOONE(ramdomNumber(0, listALEATORIOONE.length)) : new ALEATORIOONE({ pergunta: "Se você estiver de boa na praça e ver uma pessoa sendo sequestrada na esquina, oque deveria fazer ?", correta: "Ligar para a policia e alertar sobre o sequestro", alt1: "Chamar o admin pois isso é proibido", alt2: "Seguir o carro e ficar batendo nele até o mesmo capotar para salvar a vitima", alt3: "Correr atras do carro gritando que eles não poderiam fazer isso e que vai contar pros ADM" });
            let aleatorio2 = listALEATORIOTWO.length > 0 ? listALEATORIOTWO(ramdomNumber(0, listALEATORIOTWO.length)) : new ALEATORIOTWO({ pergunta: "Caso você seja sequestrado por pessoas que nunca viu antes e sem nenhum motivo aparente. Oque deveria fazer ?", correta: "Gravar toda a ação enquanto sigo o RP até o fim, após, criar uma denúncia com o vídeo e deixar que a staff tome as medidas cabíveis", alt1: "Deslogar e ir direto pro discord denunciar os envolvidos", alt2: "Falar com os sequestradores que eles não poderiam fazer isso, pois é contra as regras da cidade", alt3: "Atacar os sequestradores e depois ir para o discord denunciar eles" });
            let aleatorio3 = listALEATORIOTHREE.length > 0 ? listALEATORIOTHREE(ramdomNumber(0, listALEATORIOTHREE.length)) : new ALEATORIOTHREE({ pergunta: "Oque você deve fazer caso seu carro fure 1 pneu ?", correta: "Ligar para a mecânica e esperar o mecânico", alt1: "Dirigir o carro sem o pneu até a Bennys e pedir para arrumarem", alt2: "Continuar sua vida como se nada tivesse acontecido", alt3: "Pegar um cavalo e puxar o carro até a bennys" });
            try {
                await m1.delete();
            } catch { }
            try {
                await m99.delete();
            } catch { }

            let embed2 = new Discord.MessageEmbed()
                .setTitle("Whitelist - Atlantic City")
                .setColor(COLOR)
                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                .setDescription("Me informe o seu passaporte (id): ")
                .setFooter(`Atlantic City`, avatar);
            let m2 = await channel.send(embed2);
            const filter = m => (m.author.id == msg.author.id) && (m.channel.id == channel.id);
            const collector2 = channel.createMessageCollector(filter, { time: 300000, max: 1 });
            collector2.on('end', async (collected) => {
                try {
                    if (collected.size == 0) {
                        ant.aberto = false;
                        await ant.save();
                        try { await channel.delete() } catch { }
                        await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                    }
                } catch { }
            })
            collector2.on('collect', async (msg2) => {
                try {
                    ant.passaport = msg2.content;
                    let embed3 = new Discord.MessageEmbed()
                        .setTitle("Whitelist - Atlantic City")
                        .setColor(COLOR)
                        .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                        .setDescription("Me informe sua identidade (nome): ")
                        .setFooter(`Atlantic City`, avatar);
                    try {
                        await msg2.delete();
                        await m2.delete();
                    } catch { }
                    let m3 = await channel.send(embed3);
                    const collector3 = channel.createMessageCollector(filter, { time: 300000, max: 1 });
                    collector3.on('end', async (collected2) => {
                        try {
                            if (collected2.size == 0) {
                                ant.aberto = false;
                                await ant.save();
                                try { await channel.delete() } catch { }
                                await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                            }
                        } catch { }
                    })
                    collector3.on('collect', async (msg3) => {
                        try {
                            ant.nome = msg3.content;
                            let q = [rdm, vdm, safez, amv, power, meta, combatl, aleatorio1, aleatorio2, aleatorio3];
                            q = shuffle(q);
                            let rep4 = [q[0].correta, q[0].alt1, q[0].alt2, q[0].alt3];
                            rep4 = shuffle(rep4);
                            let embed4 = new Discord.MessageEmbed()
                                .setTitle("Whitelist - Atlantic City")
                                .setColor(COLOR)
                                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                .setDescription(`\n\n${q[0].pergunta} \n\n:one: ${rep4[0]}\n\n:two: ${rep4[1]}\n\n:three: ${rep4[2]}\n\n:four: ${rep4[3]}\n`)
                                .setFooter(`Atlantic City`, avatar);
                            try {
                                await msg3.delete();
                                await m3.delete();
                            } catch { }
                            const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];
                            let m4 = await channel.send(embed4);
                            await m4.react(emojis[0]);
                            await m4.react(emojis[1]);
                            await m4.react(emojis[2]);
                            await m4.react(emojis[3]);
                            const filter2 = (reaction, user) => user.id === msg.author.id;
                            const collector4 = m4.createReactionCollector(filter2, { time: 300000, max: 1 });
                            collector4.on('end', async (collected3) => {
                                try {
                                    if (collected3.size == 0) {
                                        ant.aberto = false;
                                        await ant.save();
                                        try { await channel.delete() } catch { }
                                        await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                    }
                                } catch { }
                            })
                            collector4.on('collect', async (emoji4) => {
                                try {
                                    switch (emoji4._emoji.name) {
                                        case emojis[0]:
                                            if (rep4[0] == q[0].correta) pontos += 1;
                                            break;
                                        case emojis[1]:
                                            if (rep4[1] == q[0].correta) pontos += 1;
                                            break;
                                        case emojis[2]:
                                            if (rep4[2] == q[0].correta) pontos += 1;
                                            break;
                                        case emojis[3]:
                                            if (rep4[3] == q[0].correta) pontos += 1;
                                            break;
                                        default:
                                            break;
                                    }
                                    try {
                                        await m4.delete();
                                    } catch { }
                                    let rep5 = [q[1].correta, q[1].alt1, q[1].alt2, q[1].alt3];
                                    rep5 = shuffle(rep5);
                                    let embed5 = new Discord.MessageEmbed()
                                        .setTitle("Whitelist - Atlantic City")
                                        .setColor(COLOR)
                                        .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                        .setDescription(`\n\n${q[1].pergunta} \n\n:one: ${rep5[0]}\n\n:two: ${rep5[1]}\n\n:three: ${rep5[2]}\n\n:four: ${rep5[3]}\n`)
                                        .setFooter(`Atlantic City`, avatar);
                                    let m5 = await channel.send(embed5);
                                    await m5.react(emojis[0]);
                                    await m5.react(emojis[1]);
                                    await m5.react(emojis[2]);
                                    await m5.react(emojis[3]);
                                    const collector5 = m5.createReactionCollector(filter2, { time: 300000, max: 1 });
                                    collector5.on('end', async (collected4) => {
                                        try {
                                            if (collected4.size == 0) {
                                                ant.aberto = false;
                                                await ant.save();
                                                try { await channel.delete() } catch { }
                                                await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                            }
                                        } catch { }
                                    })
                                    collector5.on('collect', async (emoji5) => {
                                        try {
                                            switch (emoji5._emoji.name) {
                                                case emojis[0]:
                                                    if (rep5[0] == q[1].correta) pontos += 1;
                                                    break;
                                                case emojis[1]:
                                                    if (rep5[1] == q[1].correta) pontos += 1;
                                                    break;
                                                case emojis[2]:
                                                    if (rep5[2] == q[1].correta) pontos += 1;
                                                    break;
                                                case emojis[3]:
                                                    if (rep5[3] == q[1].correta) pontos += 1;
                                                    break;
                                                default:
                                                    break;
                                            }
                                            try {
                                                await m5.delete();
                                            } catch { }
                                            let rep6 = [q[2].correta, q[2].alt1, q[2].alt2, q[2].alt3];
                                            rep6 = shuffle(rep6);
                                            let embed6 = new Discord.MessageEmbed()
                                                .setTitle("Whitelist - Atlantic City")
                                                .setColor(COLOR)
                                                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                .setDescription(`\n\n${q[2].pergunta} \n\n:one: ${rep6[0]}\n\n:two: ${rep6[1]}\n\n:three: ${rep6[2]}\n\n:four: ${rep6[3]}\n`)
                                                .setFooter(`Atlantic City`, avatar);
                                            let m6 = await channel.send(embed6);
                                            await m6.react(emojis[0]);
                                            await m6.react(emojis[1]);
                                            await m6.react(emojis[2]);
                                            await m6.react(emojis[3]);
                                            const collector6 = m6.createReactionCollector(filter2, { time: 300000, max: 1 });
                                            collector6.on('end', async (collected5) => {
                                                try {
                                                    if (collected5.size == 0) {
                                                        ant.aberto = false;
                                                        await ant.save();
                                                        try { await channel.delete() } catch { }
                                                        await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                                    }
                                                } catch { }
                                            })
                                            collector6.on('collect', async (emoji6) => {
                                                try {
                                                    switch (emoji6._emoji.name) {
                                                        case emojis[0]:
                                                            if (rep6[0] == q[2].correta) pontos += 1;
                                                            break;
                                                        case emojis[1]:
                                                            if (rep6[1] == q[2].correta) pontos += 1;
                                                            break;
                                                        case emojis[2]:
                                                            if (rep6[2] == q[2].correta) pontos += 1;
                                                            break;
                                                        case emojis[3]:
                                                            if (rep6[3] == q[2].correta) pontos += 1;
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                    try {
                                                        await m6.delete();
                                                    } catch { }
                                                    let rep7 = [q[3].correta, q[3].alt1, q[3].alt2, q[3].alt3];
                                                    rep7 = shuffle(rep7);
                                                    let embed7 = new Discord.MessageEmbed()
                                                        .setTitle("Whitelist - Atlantic City")
                                                        .setColor(COLOR)
                                                        .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                        .setDescription(`\n\n${q[3].pergunta} \n\n:one: ${rep7[0]}\n\n:two: ${rep7[1]}\n\n:three: ${rep7[2]}\n\n:four: ${rep7[3]}\n`)
                                                        .setFooter(`Atlantic City`, avatar);
                                                    let m7 = await channel.send(embed7);
                                                    await m7.react(emojis[0]);
                                                    await m7.react(emojis[1]);
                                                    await m7.react(emojis[2]);
                                                    await m7.react(emojis[3]);
                                                    const collector7 = m7.createReactionCollector(filter2, { time: 300000, max: 1 });
                                                    collector7.on('end', async (collected6) => {
                                                        try {
                                                            if (collected6.size == 0) {
                                                                ant.aberto = false;
                                                                await ant.save();
                                                                try { await channel.delete() } catch { }
                                                                await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                                            }
                                                        } catch { }
                                                    })
                                                    collector7.on('collect', async (emoji7) => {
                                                        try {
                                                            switch (emoji7._emoji.name) {
                                                                case emojis[0]:
                                                                    if (rep7[0] == q[3].correta) pontos += 1;
                                                                    break;
                                                                case emojis[1]:
                                                                    if (rep7[1] == q[3].correta) pontos += 1;
                                                                    break;
                                                                case emojis[2]:
                                                                    if (rep7[2] == q[3].correta) pontos += 1;
                                                                    break;
                                                                case emojis[3]:
                                                                    if (rep7[3] == q[3].correta) pontos += 1;
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                            try {
                                                                await m7.delete();
                                                            } catch { }
                                                            let rep8 = [q[4].correta, q[4].alt1, q[4].alt2, q[4].alt3];
                                                            rep8 = shuffle(rep8);
                                                            let embed8 = new Discord.MessageEmbed()
                                                                .setTitle("Whitelist - Atlantic City")
                                                                .setColor(COLOR)
                                                                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                                .setDescription(`\n\n${q[4].pergunta} \n\n:one: ${rep8[0]}\n\n:two: ${rep8[1]}\n\n:three: ${rep8[2]}\n\n:four: ${rep8[3]}\n`)
                                                                .setFooter(`Atlantic City`, avatar);
                                                            let m8 = await channel.send(embed8);
                                                            await m8.react(emojis[0]);
                                                            await m8.react(emojis[1]);
                                                            await m8.react(emojis[2]);
                                                            await m8.react(emojis[3]);
                                                            const collector8 = m8.createReactionCollector(filter2, { time: 300000, max: 1 });
                                                            collector8.on('end', async (collected7) => {
                                                                try {
                                                                    if (collected7.size == 0) {
                                                                        ant.aberto = false;
                                                                        await ant.save();
                                                                        try { await channel.delete() } catch { }
                                                                        await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                                                    }
                                                                } catch { }
                                                            })
                                                            collector8.on('collect', async (emoji8) => {
                                                                try {
                                                                    switch (emoji8._emoji.name) {
                                                                        case emojis[0]:
                                                                            if (rep8[0] == q[4].correta) pontos += 1;
                                                                            break;
                                                                        case emojis[1]:
                                                                            if (rep8[1] == q[4].correta) pontos += 1;
                                                                            break;
                                                                        case emojis[2]:
                                                                            if (rep8[2] == q[4].correta) pontos += 1;
                                                                            break;
                                                                        case emojis[3]:
                                                                            if (rep8[3] == q[4].correta) pontos += 1;
                                                                            break;
                                                                        default:
                                                                            break;
                                                                    }
                                                                    try {
                                                                        await m8.delete();
                                                                    } catch { }
                                                                    let rep9 = [q[5].correta, q[5].alt1, q[5].alt2, q[5].alt3];
                                                                    rep9 = shuffle(rep9);
                                                                    let embed9 = new Discord.MessageEmbed()
                                                                        .setTitle("Whitelist - Atlantic City")
                                                                        .setColor(COLOR)
                                                                        .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                                        .setDescription(`\n\n${q[5].pergunta} \n\n:one: ${rep9[0]}\n\n:two: ${rep9[1]}\n\n:three: ${rep9[2]}\n\n:four: ${rep9[3]}\n`)
                                                                        .setFooter(`Atlantic City`, avatar);
                                                                    let m9 = await channel.send(embed9);
                                                                    await m9.react(emojis[0]);
                                                                    await m9.react(emojis[1]);
                                                                    await m9.react(emojis[2]);
                                                                    await m9.react(emojis[3]);
                                                                    const collector9 = m9.createReactionCollector(filter2, { time: 300000, max: 1 });
                                                                    collector9.on('end', async (collected8) => {
                                                                        try {
                                                                            if (collected8.size == 0) {
                                                                                ant.aberto = false;
                                                                                await ant.save();
                                                                                try { await channel.delete() } catch { }
                                                                                await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                                                            }
                                                                        } catch { }
                                                                    })
                                                                    collector9.on('collect', async (emoji9) => {
                                                                        try {
                                                                            switch (emoji9._emoji.name) {
                                                                                case emojis[0]:
                                                                                    if (rep9[0] == q[5].correta) pontos += 1;
                                                                                    break;
                                                                                case emojis[1]:
                                                                                    if (rep9[1] == q[5].correta) pontos += 1;
                                                                                    break;
                                                                                case emojis[2]:
                                                                                    if (rep9[2] == q[5].correta) pontos += 1;
                                                                                    break;
                                                                                case emojis[3]:
                                                                                    if (rep9[3] == q[5].correta) pontos += 1;
                                                                                    break;
                                                                                default:
                                                                                    break;
                                                                            }
                                                                            try {
                                                                                await m9.delete();
                                                                            } catch { }
                                                                            let rep10 = [q[6].correta, q[6].alt1, q[6].alt2, q[6].alt3];
                                                                            rep10 = shuffle(rep10);
                                                                            let embed10 = new Discord.MessageEmbed()
                                                                                .setTitle("Whitelist - Atlantic City")
                                                                                .setColor(COLOR)
                                                                                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                                                .setDescription(`\n\n${q[6].pergunta} \n\n:one: ${rep10[0]}\n\n:two: ${rep10[1]}\n\n:three: ${rep10[2]}\n\n:four: ${rep10[3]}\n`)
                                                                                .setFooter(`Atlantic City`, avatar);
                                                                            let m10 = await channel.send(embed10);
                                                                            await m10.react(emojis[0]);
                                                                            await m10.react(emojis[1]);
                                                                            await m10.react(emojis[2]);
                                                                            await m10.react(emojis[3]);
                                                                            const collector10 = m10.createReactionCollector(filter2, { time: 300000, max: 1 });
                                                                            collector10.on('end', async (collected9) => {
                                                                                try {
                                                                                    if (collected9.size == 0) {
                                                                                        ant.aberto = false;
                                                                                        await ant.save();
                                                                                        try { await channel.delete() } catch { }
                                                                                        await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                                                                    }
                                                                                } catch { }
                                                                            })
                                                                            collector10.on('collect', async (emoji10) => {
                                                                                try {
                                                                                    switch (emoji10._emoji.name) {
                                                                                        case emojis[0]:
                                                                                            if (rep10[0] == q[6].correta) pontos += 1;
                                                                                            break;
                                                                                        case emojis[1]:
                                                                                            if (rep10[1] == q[6].correta) pontos += 1;
                                                                                            break;
                                                                                        case emojis[2]:
                                                                                            if (rep10[2] == q[6].correta) pontos += 1;
                                                                                            break;
                                                                                        case emojis[3]:
                                                                                            if (rep10[3] == q[6].correta) pontos += 1;
                                                                                            break;
                                                                                        default:
                                                                                            break;
                                                                                    }
                                                                                    try {
                                                                                        await m10.delete();
                                                                                    } catch { }
                                                                                    let rep11 = [q[7].correta, q[7].alt1, q[7].alt2, q[7].alt3];
                                                                                    rep11 = shuffle(rep11);
                                                                                    let embed11 = new Discord.MessageEmbed()
                                                                                        .setTitle("Whitelist - Atlantic City")
                                                                                        .setColor(COLOR)
                                                                                        .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                                                        .setDescription(`\n\n${q[7].pergunta} \n\n:one: ${rep11[0]}\n\n:two: ${rep11[1]}\n\n:three: ${rep11[2]}\n\n:four: ${rep11[3]}\n`)
                                                                                        .setFooter(`Atlantic City`, avatar);
                                                                                    let m11 = await channel.send(embed11);
                                                                                    await m11.react(emojis[0]);
                                                                                    await m11.react(emojis[1]);
                                                                                    await m11.react(emojis[2]);
                                                                                    await m11.react(emojis[3]);
                                                                                    const collector11 = m11.createReactionCollector(filter2, { time: 300000, max: 1 });
                                                                                    collector11.on('end', async (collected10) => {
                                                                                        try {
                                                                                            if (collected10.size == 0) {
                                                                                                ant.aberto = false;
                                                                                                await ant.save();
                                                                                                try { await channel.delete() } catch { }
                                                                                                await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                                                                            }
                                                                                        } catch { }
                                                                                    })
                                                                                    collector11.on('collect', async (emoji11) => {
                                                                                        try {
                                                                                            switch (emoji11._emoji.name) {
                                                                                                case emojis[0]:
                                                                                                    if (rep11[0] == q[7].correta) pontos += 1;
                                                                                                    break;
                                                                                                case emojis[1]:
                                                                                                    if (rep11[1] == q[7].correta) pontos += 1;
                                                                                                    break;
                                                                                                case emojis[2]:
                                                                                                    if (rep11[2] == q[7].correta) pontos += 1;
                                                                                                    break;
                                                                                                case emojis[3]:
                                                                                                    if (rep11[3] == q[7].correta) pontos += 1;
                                                                                                    break;
                                                                                                default:
                                                                                                    break;
                                                                                            }
                                                                                            try {
                                                                                                await m11.delete();
                                                                                            } catch { }
                                                                                            let rep12 = [q[8].correta, q[8].alt1, q[8].alt2, q[8].alt3];
                                                                                            rep12 = shuffle(rep12);
                                                                                            let embed12 = new Discord.MessageEmbed()
                                                                                                .setTitle("Whitelist - Atlantic City")
                                                                                                .setColor(COLOR)
                                                                                                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                                                                .setDescription(`\n\n${q[8].pergunta} \n\n:one: ${rep12[0]}\n\n:two: ${rep12[1]}\n\n:three: ${rep12[2]}\n\n:four: ${rep12[3]}\n`)
                                                                                                .setFooter(`Atlantic City`, avatar);
                                                                                            let m12 = await channel.send(embed12);
                                                                                            await m12.react(emojis[0]);
                                                                                            await m12.react(emojis[1]);
                                                                                            await m12.react(emojis[2]);
                                                                                            await m12.react(emojis[3]);
                                                                                            const collector12 = m12.createReactionCollector(filter2, { time: 300000, max: 1 });
                                                                                            collector12.on('end', async (collected11) => {
                                                                                                try {
                                                                                                    if (collected11.size == 0) {
                                                                                                        ant.aberto = false;
                                                                                                        await ant.save();
                                                                                                        try { await channel.delete() } catch { }
                                                                                                        await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                                                                                    }
                                                                                                } catch { }
                                                                                            })
                                                                                            collector12.on('collect', async (emoji12) => {
                                                                                                try {
                                                                                                    switch (emoji12._emoji.name) {
                                                                                                        case emojis[0]:
                                                                                                            if (rep12[0] == q[8].correta) pontos += 1;
                                                                                                            break;
                                                                                                        case emojis[1]:
                                                                                                            if (rep12[1] == q[8].correta) pontos += 1;
                                                                                                            break;
                                                                                                        case emojis[2]:
                                                                                                            if (rep12[2] == q[8].correta) pontos += 1;
                                                                                                            break;
                                                                                                        case emojis[3]:
                                                                                                            if (rep12[3] == q[8].correta) pontos += 1;
                                                                                                            break;
                                                                                                        default:
                                                                                                            break;
                                                                                                    }
                                                                                                    try {
                                                                                                        await m12.delete();
                                                                                                    } catch { }
                                                                                                    let rep13 = [q[9].correta, q[9].alt1, q[9].alt2, q[9].alt3];
                                                                                                    rep13 = shuffle(rep13);
                                                                                                    let embed13 = new Discord.MessageEmbed()
                                                                                                        .setTitle("Whitelist - Atlantic City")
                                                                                                        .setColor(COLOR)
                                                                                                        .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                                                                        .setDescription(`\n\n${q[9].pergunta} \n\n:one: ${rep13[0]}\n\n:two: ${rep13[1]}\n\n:three: ${rep13[2]}\n\n:four: ${rep13[3]}\n`)
                                                                                                        .setFooter(`Atlantic City`, avatar);
                                                                                                    let m13 = await channel.send(embed13);
                                                                                                    await m13.react(emojis[0]);
                                                                                                    await m13.react(emojis[1]);
                                                                                                    await m13.react(emojis[2]);
                                                                                                    await m13.react(emojis[3]);
                                                                                                    const collector13 = m13.createReactionCollector(filter2, { time: 300000, max: 1 });
                                                                                                    collector13.on('end', async (collected12) => {
                                                                                                        try {
                                                                                                            if (collected12.size == 0) {
                                                                                                                ant.aberto = false;
                                                                                                                await ant.save();
                                                                                                                try { await channel.delete() } catch { }
                                                                                                                await Reprovado(msg, args, client, msg.autor.id, msd.author.username, "Não respondeu a WL a tempo.", client.user);
                                                                                                            }
                                                                                                        } catch { }
                                                                                                    })
                                                                                                    collector13.on('collect', async (emoji13) => {
                                                                                                        try {
                                                                                                            switch (emoji12._emoji.name) {
                                                                                                                case emojis[0]:
                                                                                                                    if (rep13[0] == q[9].correta) pontos += 1;
                                                                                                                    break;
                                                                                                                case emojis[1]:
                                                                                                                    if (rep13[1] == q[9].correta) pontos += 1;
                                                                                                                    break;
                                                                                                                case emojis[2]:
                                                                                                                    if (rep13[2] == q[9].correta) pontos += 1;
                                                                                                                    break;
                                                                                                                case emojis[3]:
                                                                                                                    if (rep13[3] == q[9].correta) pontos += 1;
                                                                                                                    break;
                                                                                                                default:
                                                                                                                    break;
                                                                                                            }
                                                                                                            let embed14 = new Discord.MessageEmbed()
                                                                                                                .setTitle("Whitelist - Atlantic City")
                                                                                                                .setColor(COLOR)
                                                                                                                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                                                                                                                .setDescription(`Estou checando sua WL e em breve sera aprovada ou reprovada. \n\nFechando a sala em 5segundos.\n\nObrigado por escolher a Atlantic City !!\n`)
                                                                                                                .setFooter(`Atlantic City`, avatar);
                                                                                                            try {
                                                                                                                await m13.delete();
                                                                                                            } catch { }
                                                                                                            await channel.send(embed14);
                                                                                                            channel.delete();
                                                                                                            ant.aberto = false;
                                                                                                            if (pontos >= 7)
                                                                                                                ant.aprovado = true;
                                                                                                            await ant.save();
                                                                                                            if (ant.aprovado) {
                                                                                                                await CheckID(ant.passaport, msg, args, client, ant);
                                                                                                                await sleep(5000);
                                                                                                                try {
                                                                                                                    await channel.delete();
                                                                                                                } catch { }
                                                                                                            } else {
                                                                                                                try {
                                                                                                                    await channel.delete();
                                                                                                                } catch { }
                                                                                                                await Reprovado(msg, args, client, msg.author.id, msg.author.username, "Não alcançou 70% de acerto na WL", client.user);
                                                                                                            }
                                                                                                        } catch (e) {
                                                                                                            console.log(e);
                                                                                                            ant.aberto = false;
                                                                                                            if (ant.tentativas > 0) {
                                                                                                                switch (ant.tentativas) {
                                                                                                                    case 1:
                                                                                                                        ant.next = new Date().addHours(1).retString();
                                                                                                                        break;
                                                                                                                    case 2:
                                                                                                                        ant.next = new Date().addHours(4).retString();
                                                                                                                        break;
                                                                                                                    case 3:
                                                                                                                        ant.next = new Date().addHours(8).retString();
                                                                                                                        break;
                                                                                                                    case 4:
                                                                                                                        ant.next = new Date().addHours(14).retString();
                                                                                                                        break;
                                                                                                                }
                                                                                                                if (ant.tentativas >= 5) {
                                                                                                                    ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                                                                                }
                                                                                                            }
                                                                                                            await ant.save();
                                                                                                            if (channel != null) {
                                                                                                                await channel.delete();
                                                                                                            }
                                                                                                        }
                                                                                                    })
                                                                                                } catch (e) {
                                                                                                    console.log(e);
                                                                                                    ant.aberto = false;
                                                                                                    if (ant.tentativas > 0) {
                                                                                                        switch (ant.tentativas) {
                                                                                                            case 1:
                                                                                                                ant.next = new Date().addHours(1).retString();
                                                                                                                break;
                                                                                                            case 2:
                                                                                                                ant.next = new Date().addHours(4).retString();
                                                                                                                break;
                                                                                                            case 3:
                                                                                                                ant.next = new Date().addHours(8).retString();
                                                                                                                break;
                                                                                                            case 4:
                                                                                                                ant.next = new Date().addHours(14).retString();
                                                                                                                break;
                                                                                                        }
                                                                                                        if (ant.tentativas >= 5) {
                                                                                                            ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                                                                        }
                                                                                                    }
                                                                                                    await ant.save();
                                                                                                    if (channel != null) {
                                                                                                        await channel.delete();
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        } catch (e) {
                                                                                            console.log(e);
                                                                                            ant.aberto = false;
                                                                                            if (ant.tentativas > 0) {
                                                                                                switch (ant.tentativas) {
                                                                                                    case 1:
                                                                                                        ant.next = new Date().addHours(1).retString();
                                                                                                        break;
                                                                                                    case 2:
                                                                                                        ant.next = new Date().addHours(4).retString();
                                                                                                        break;
                                                                                                    case 3:
                                                                                                        ant.next = new Date().addHours(8).retString();
                                                                                                        break;
                                                                                                    case 4:
                                                                                                        ant.next = new Date().addHours(14).retString();
                                                                                                        break;
                                                                                                }
                                                                                                if (ant.tentativas >= 5) {
                                                                                                    ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                                                                }
                                                                                            }
                                                                                            await ant.save();
                                                                                            if (channel != null) {
                                                                                                await channel.delete();
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                } catch (e) {
                                                                                    console.log(e);
                                                                                    ant.aberto = false;
                                                                                    if (ant.tentativas > 0) {
                                                                                        switch (ant.tentativas) {
                                                                                            case 1:
                                                                                                ant.next = new Date().addHours(1).retString();
                                                                                                break;
                                                                                            case 2:
                                                                                                ant.next = new Date().addHours(4).retString();
                                                                                                break;
                                                                                            case 3:
                                                                                                ant.next = new Date().addHours(8).retString();
                                                                                                break;
                                                                                            case 4:
                                                                                                ant.next = new Date().addHours(14).retString();
                                                                                                break;
                                                                                        }
                                                                                        if (ant.tentativas >= 5) {
                                                                                            ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                                                        }
                                                                                    }
                                                                                    await ant.save();
                                                                                    if (channel != null) {
                                                                                        await channel.delete();
                                                                                    }
                                                                                }
                                                                            })
                                                                        } catch (e) {
                                                                            console.log(e);
                                                                            ant.aberto = false;
                                                                            if (ant.tentativas > 0) {
                                                                                switch (ant.tentativas) {
                                                                                    case 1:
                                                                                        ant.next = new Date().addHours(1).retString();
                                                                                        break;
                                                                                    case 2:
                                                                                        ant.next = new Date().addHours(4).retString();
                                                                                        break;
                                                                                    case 3:
                                                                                        ant.next = new Date().addHours(8).retString();
                                                                                        break;
                                                                                    case 4:
                                                                                        ant.next = new Date().addHours(14).retString();
                                                                                        break;
                                                                                }
                                                                                if (ant.tentativas >= 5) {
                                                                                    ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                                                }
                                                                            }
                                                                            await ant.save();
                                                                            if (channel != null) {
                                                                                await channel.delete();
                                                                            }
                                                                        }
                                                                    })
                                                                } catch (e) {
                                                                    console.log(e);
                                                                    ant.aberto = false;
                                                                    if (ant.tentativas > 0) {
                                                                        switch (ant.tentativas) {
                                                                            case 1:
                                                                                ant.next = new Date().addHours(1).retString();
                                                                                break;
                                                                            case 2:
                                                                                ant.next = new Date().addHours(4).retString();
                                                                                break;
                                                                            case 3:
                                                                                ant.next = new Date().addHours(8).retString();
                                                                                break;
                                                                            case 4:
                                                                                ant.next = new Date().addHours(14).retString();
                                                                                break;
                                                                        }
                                                                        if (ant.tentativas >= 5) {
                                                                            ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                                        }
                                                                    }
                                                                    await ant.save();
                                                                    if (channel != null) {
                                                                        await channel.delete();
                                                                    }
                                                                }
                                                            })
                                                        } catch (e) {
                                                            console.log(e);
                                                            ant.aberto = false;
                                                            if (ant.tentativas > 0) {
                                                                switch (ant.tentativas) {
                                                                    case 1:
                                                                        ant.next = new Date().addHours(1).retString();
                                                                        break;
                                                                    case 2:
                                                                        ant.next = new Date().addHours(4).retString();
                                                                        break;
                                                                    case 3:
                                                                        ant.next = new Date().addHours(8).retString();
                                                                        break;
                                                                    case 4:
                                                                        ant.next = new Date().addHours(14).retString();
                                                                        break;
                                                                }
                                                                if (ant.tentativas >= 5) {
                                                                    ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                                }
                                                            }
                                                            await ant.save();
                                                            if (channel != null) {
                                                                await channel.delete();
                                                            }
                                                        }
                                                    })
                                                } catch (e) {
                                                    console.log(e);
                                                    ant.aberto = false;
                                                    if (ant.tentativas > 0) {
                                                        switch (ant.tentativas) {
                                                            case 1:
                                                                ant.next = new Date().addHours(1).retString();
                                                                break;
                                                            case 2:
                                                                ant.next = new Date().addHours(4).retString();
                                                                break;
                                                            case 3:
                                                                ant.next = new Date().addHours(8).retString();
                                                                break;
                                                            case 4:
                                                                ant.next = new Date().addHours(14).retString();
                                                                break;
                                                        }
                                                        if (ant.tentativas >= 5) {
                                                            ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                        }
                                                    }
                                                    await ant.save();
                                                    if (channel != null) {
                                                        await channel.delete();
                                                    }
                                                }
                                            })
                                        } catch (e) {
                                            console.log(e);
                                            ant.aberto = false;
                                            if (ant.tentativas > 0) {
                                                switch (ant.tentativas) {
                                                    case 1:
                                                        ant.next = new Date().addHours(1).retString();
                                                        break;
                                                    case 2:
                                                        ant.next = new Date().addHours(4).retString();
                                                        break;
                                                    case 3:
                                                        ant.next = new Date().addHours(8).retString();
                                                        break;
                                                    case 4:
                                                        ant.next = new Date().addHours(14).retString();
                                                        break;
                                                }
                                                if (ant.tentativas >= 5) {
                                                    ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                                }
                                            }
                                            await ant.save();
                                            if (channel != null) {
                                                await channel.delete();
                                            }
                                        }
                                    })
                                } catch (e) {
                                    console.log(e);
                                    ant.aberto = false;
                                    if (ant.tentativas > 0) {
                                        switch (ant.tentativas) {
                                            case 1:
                                                ant.next = new Date().addHours(1).retString();
                                                break;
                                            case 2:
                                                ant.next = new Date().addHours(4).retString();
                                                break;
                                            case 3:
                                                ant.next = new Date().addHours(8).retString();
                                                break;
                                            case 4:
                                                ant.next = new Date().addHours(14).retString();
                                                break;
                                        }
                                        if (ant.tentativas >= 5) {
                                            ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                        }
                                    }
                                    await ant.save();
                                    if (channel != null) {
                                        await channel.delete();
                                    }
                                }
                            })
                        } catch (e) {
                            console.log(e);
                            ant.aberto = false;
                            if (ant.tentativas > 0) {
                                switch (ant.tentativas) {
                                    case 1:
                                        ant.next = new Date().addHours(1).retString();
                                        break;
                                    case 2:
                                        ant.next = new Date().addHours(4).retString();
                                        break;
                                    case 3:
                                        ant.next = new Date().addHours(8).retString();
                                        break;
                                    case 4:
                                        ant.next = new Date().addHours(14).retString();
                                        break;
                                }
                                if (ant.tentativas >= 5) {
                                    ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                                }
                            }
                            await ant.save();
                            if (channel != null) {
                                await channel.delete();
                            }
                        }
                    })
                } catch (e) {
                    console.log(e);
                    ant.aberto = false;
                    if (ant.tentativas > 0) {
                        switch (ant.tentativas) {
                            case 1:
                                ant.next = new Date().addHours(1).retString();
                                break;
                            case 2:
                                ant.next = new Date().addHours(4).retString();
                                break;
                            case 3:
                                ant.next = new Date().addHours(8).retString();
                                break;
                            case 4:
                                ant.next = new Date().addHours(14).retString();
                                break;
                        }
                        if (ant.tentativas >= 5) {
                            ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                        }
                    }
                    await ant.save();
                    if (channel != null) {
                        await channel.delete();
                    }
                }
            })
        } catch (e) {
            console.log(e);
            ant.aberto = false;
            if (ant.tentativas > 0) {
                switch (ant.tentativas) {
                    case 1:
                        ant.next = new Date().addHours(1).retString();
                        break;
                    case 2:
                        ant.next = new Date().addHours(4).retString();
                        break;
                    case 3:
                        ant.next = new Date().addHours(8).retString();
                        break;
                    case 4:
                        ant.next = new Date().addHours(14).retString();
                        break;
                }
                if (ant.tentativas >= 5) {
                    ant.next = new Date().addHours(((ant.tentativas * 24) - 96)).retString();
                }
            }
            await ant.save();
            if (channel != null) {
                await channel.delete();
            }
        }
    }
}