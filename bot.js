const Discord = require('discord.js');
const Client = new Discord.Client();
const token = ""; // Use ur DC token
const prefix = ""; // Use ur prefix
const axios = require("axios");
const talkedRecently = new Set(); // Cooldown




// Simple Replys + Status Command
Client.on('message', async message => {
    if(message.author.id == Client.user.id){
        return;
      }
      if(message.author.bot){
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

            
                 if (message.content.toLowerCase() === `${prefix}status`) {
                    let serverstatsoffline = new Discord.MessageEmbed() 
                    .setTitle(`None`)   
                    .setDescription([ 
                    "**Players** " + "\`0/0\`",
                    "**Status** " + "Offline 🔴",
                    "**Website** " + "Offline 🔴"
                                ]) 
                    .setTimestamp()
                    
                    if(message.author.avatarURL) {
                        serverstatsoffline.setFooter(`Requested by : ${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
                    } else {
                        serverstatsoffline.setFooter(`Requested by : ${message.author.username}#${message.author.discriminator}`)
                    }

                    let server
                    try {
                        server = await axios.get(`https://api.altv.mp/server/YOUR-ID`, { responseType: 'json' }); // Use your Server ID from: https://api.altv.mp/servers/list
                    }      
                    catch (e) {
                        return message.channel.send(serverstatsoffline) 
                    }


                    let serverstatsonline = new Discord.MessageEmbed() 
                    .setTitle(`${server.data.info.name}`)   
                    .setDescription([ 
                    "**Players** " + "\`" + server.data.info.players + "/" + server.data.info.maxPlayers + "\`",
                    "**Status** " + "Online 🟢",
                    "**Website** " + "https://" + server.data.info.website
                                ])
                    .setTimestamp()
                    
                    if(message.author.avatarURL) {
                        serverstatsonline.setFooter(`Requested by : ${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
                    } else {
                        serverstatsonline.setFooter(`Requested by : ${message.author.username}#${message.author.discriminator}`)
                    }
                    message.channel.send(serverstatsonline)
            
            talkedRecently.add(message.author.id);
            setTimeout(() => {
            
            talkedRecently.delete(message.author.id);
            }, 60000);  // Command Cooldown
        }
    }
});

// Client Ready
Client.on("ready", async () => {
    let server
    try {
        server = await axios.get(`https://api.altv.mp/server/YOUR-ID`, { responseType: 'json' }); // Use your Server ID from: https://api.altv.mp/servers/list
    }      
    catch (e) {
        return console.log("Cant find the Server") 
    }

  console.log(`${Client.user.tag} is starting, have fun!.`);
  Client.user.setStatus(`dnd`);
  const activity = server.data.info.players + "/" + server.data.info.maxPlayers;
  Client.user.setActivity(`${activity} Players | ${prefix}help`)
});

//Login
Client.login(token)
