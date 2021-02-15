const Discord = require('discord.js');
const Client = new Discord.Client();
const token = ""; // Use ur DC token
const prefix = ""; // Use ur prefix
const axios = require("axios");
const talkedRecently = new Set();
const server = await axios.get(`https://api.altv.mp/server/YOUR-ID`, { responseType: 'json' }); // Use your Server ID from: https://api.altv.mp/servers/list

// Simple Replys + Status Command
Client.on('message', message => {
    if(message.author.id == client.user.id){
        return;
      }
	if(message.mentions.users.size){
		if(message.mentions.users.first().id == client.user.id){
        	return message.channel.send(`My Prefix is \`\`${prefix}\`\`😄`)
		}
	}
	if(message.guild == null){
		return;
	}
    if (!message.content.startsWith(prefix) || message.author.bot) return;

            if (talkedRecently.has(message.author.id)) {
            } else {

            
                 if (message.content.toLowerCase() === '/status') {
                    if(!server.data.active) { online = "No" } else if (server.data.active) { online = "Yes" }
                    let serverstats = new Discord.MessageEmbed() 
                    .setTitle(`${server.data.info.name}`)   
                    .setDescription([ 
                    "**Players** " + "\`" + server.data.info.players + "/" + server.data.info.maxPlayers + "\`",
                    "**Online** " + "\`" + server.data.active + "\`",
                    "**Website** " + "https://" + server.data.info.website
                                ]) 
                    .setTimestamp()
                    }
                    if(message.author.avatarURL) {
                        serverstats.setFooter(`Requested by : ${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
                    } else {
                        serverstats.setFooter(`Requested by : ${message.author.username}#${message.author.discriminator}`)
                    }
                    message.channel.send(serverstats)
            
            talkedRecently.add(message.author.id);
            setTimeout(() => {
            
            talkedRecently.delete(message.author.id);
            }, 60000);  // Command Cooldown
        }

});

// Client Ready
Client.on("ready", () => {
  console.log(`${Client.user.tag} is starting, have fun!.`);
  Client.user.setStatus(`dnd`);
  const activity = server.data.info.players + "/" + server.data.info.maxPlayers;
  Client.user.setActivity(`${activity} | ${prefix}help`, { type: WATCHING })
});

//Login
Client.login(settings.key)
