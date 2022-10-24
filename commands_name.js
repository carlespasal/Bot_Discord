//Clases
const {SlashCommandBuilder, Routes} = require('discord.js');
const {REST} = require('@discordjs/rest');
const {idBot, idServerTest, token} = require('./config.json');

const  comandos = [
    new SlashCommandBuilder().setName('ping').setDescription('responde con un pong'),
    new SlashCommandBuilder().setName('prueba').setDescription('a ver si funca tu'),
].map(comando => comando.toJSON());

const rest = new REST({
    version:'10'
}).setToken(token);

const desplegarCommandos = async() =>{
    try {
        await rest.put(Routes.applicationCommands(idBot, idServerTest), {
            body: comandos
        });
        console.log('commandos desplegados');
    }catch(err){
    console.error('error comandos' + err);
    }
};

desplegarCommandos()