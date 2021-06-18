const Discord = require('discord.js')
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
const { PORCENT, COLOR, OWNER, rwl, wlRole } = require('../json/config-wl.json')
const db = require('quick.db');
const mysql = require('mysql');

exports.AddMoney = async function (id, quantidade) {
    try {
        let con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'skips'
        });
        con.connect(function (err) {
            if (err) {
                return console.log(`[MYSQL] Falha ao conectar\n${err.stack}`)
            }
            let newQtd = quantidade;
            var request = `SELECT moedas FROM vrp_users WHERE id ='${id}'`;
            con.query(request, function (err, result) {
                if (err) throw err;
                newQtd += result[0].moedas;
                var sql = `UPDATE vrp_users SET moedas='${newQtd}' WHERE id='${id}'`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(`[MYSQL] Linhas afetadas: ${result.affectedRows}`)
                    return console.log("[MYSQL] Dinheiro adicionado | ID : " + id + " | Quantidade Adicionada: " + quantidade + " | Novo Valor: " + newQtd);
                })
            })
        })
    } catch (e) {
        return console.log(`[MYSQL] Erro ao adicionar dinheiro id:\n${e}`);
    }
}