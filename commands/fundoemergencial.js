//http://www.portaltransparencia.gov.br/api-de-dados/auxilio-emergencial-por-cpf-ou-nis?codigoBeneficiario=15605404784&pagina=1

const Discord = require("discord.js");
const { TOKENGOVERNO, COLOR } = require('../json/config.json')
const fetch = require('node-fetch')

module.exports = {
    name: "auxilio",
    aliases: [],
    description: "Seta uma mensagem de bem-vindo personalizada",
    async execute(msg, args, client) {
        const options = {
            headers: { "chave-api-dados": "c0ca0eb7026830e649647ae23460377c" }
        };
        //let dados = await fetch('http://www.portaltransparencia.gov.br/api-de-dados/auxilio-emergencial-por-cpf-ou-nis?codigoBeneficiario=15605404784', options)
        //    .then(res => res.json())
        //    .then(json => json);
        let dados = await fetch('http://www.portaltransparencia.gov.br/api-de-dados/auxilio-emergencial-por-municipio?mesAno=202008&codigoIbge=3204005&pagina=2', options)
            .then(res => res.json())
            .then(json => json);
        console.log(dados)
    }
}