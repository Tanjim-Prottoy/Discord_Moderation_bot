const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const db = require("quick.db");
const Fs = require('fs');
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const colors = require("colors");
const fetch = require('node-fetch');
const wait = require('node:timers/promises').setTimeout;
const ms = require('ms');

// ----------------------------------| Creating a new Client:
const client = new Client({
    intents: 32767,
});

// ----------------------------------| Defines discord-modals package:
const discordModals = require('discord-modals');
discordModals(client);

module.exports = client;

// ----------------------------------| Creating Colections:
client.commands = new Collection();
client.slashCommands = new Collection();
client.snipes = new Map();
client.config = require("./config.json");

require("./handler")(client);

// ----------------------------------| Cool looking console messages:
console.log("———————————————————————————————————————————————————————————————")
console.log("- Welcome to Tanjim Prottoy#5055's Commands Handler!".underline.green + " Loading commands...".brightYellow.italic)
console.log("———————————————————————————————————————————————————————————————")
console.log("[WARN] If your bot isn't coming online, try to run the command 'kill 1' in shell.\n".bold.red)

// ----------------------------------| Slash Cmds:
const commands = [];
const commandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./slashCommands/${file}`);
	commands.push(command.data.toJSON());
  client.slashCommands.set(command.data.name, command);
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('[SLASH-HANDLER] Started refreshing application (/) commands...'.bold.brightYellow);

    await rest.put(
			Routes.applicationGuildCommands(config.users.client_id, config.guilds.guild_id),
			{ body: commands },
		)

		console.log('[SLASH-HANDLER] Reloaded and Registered (/) Succesfully!'.bold.brightGreen);
	} catch (error) {
		console.error(error);
	}
})();

// ----------------------------------| Snipe command system:
client.on("messageDelete", async (message) => {
  client.snipes.set(message.channel.id,{
    content : message.content,
    author: message.author,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
});

// ----------------------------------| Ranking System:
const Levels = require("discord-xp");
Levels.setURL(process.env.MONGO);

client.on("messageCreate", async message => {
  const ch = db.fetch(`rank_system_${message.guild.id}`);
  
  if(ch === null) return;
  if(ch == false) return;  
  
  if (message.author.bot) return;
  if (!message.guild) return;

  const randomXp = Math.floor(Math.random() * 98) + 1;
  const level = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomXp
  );
  
  if (level) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`⚡ [*LEVEL-UP*] **Congratulations,** ${message.author}! You just leveled up to **level ${user.level}**!`)
  }
})

// ----------------------------------| Auto Moderation System:
client.on("guildMemberAdd", async (member) => {
  let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));
  UserJSON[member.id] = {
    warns: 0
  }
  Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
})

let badWords = require("./config/badwords.json")

client.on("messageCreate", async message => {
  let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));

  if (!UserJSON[message.author.id]) {
    if (message.author.bot) return;
    UserJSON[message.author.id] = {
      warns: 0
    }
    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
  }
for (i = 0; i < badWords.length; i++) {

  const automodCheck = db.fetch(`automod_system_${message.guild.id}`)

  if(automodCheck == true) {

    if (message.member.permissions.has("ADMINISTRATOR")) return;
  
    if (message.content.toLowerCase().includes(badWords[i])) {
  
    message.channel.send(`${message.author}, **Watch your language!** Continuing with 3 total infractions will ends in a mute.`).then(async (msg) => {
      await wait(5000);
      msg.delete();
    })

    message.delete().catch(() => { });

    UserJSON[message.author.id].warns += 1;
    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

    try {
      
      if (UserJSON[message.author.id].warns === 3) {
 
      (Fs.readFileSync("./database/users.json"));
  
      UserJSON[message.author.id].warns = 0;
  
      Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

      const user = message.member

      const time = config.systems.automod.mute_time;

      if(!time) return;

      const milliseconds = ms(time);
      
      const iosTime = new Date(Date.now() + milliseconds).toISOString();

      try {

	      await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
		      method: 'PATCH',
		      body: JSON.stringify({ communication_disabled_until: iosTime }),
		      headers: {
			      'Content-Type': 'application/json',
			      'Authorization': `Bot ${client.token}`,
		      },
	      });

      } catch (err) {
        console.log("[ERR] ", err)
      }
    
      const embedMuted = new MessageEmbed()
        .setDescription(`${config.emojis.success} ${user} has been **muted** for **Continuous Infractions.**`)
        .setFooter("Auto Moderation System")
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.channel.send({ embeds: [embedMuted] }).catch(() => { });
  
      }
    } catch (err) {
      console.log(err)
    }
  }
} else {
    return;
}
}})

// ----------------------------------| Giveaways manager:
const { GiveawaysManager } = require("discord-giveaways");

client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./database/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#2F3136",
    updateCountdownEvery: 1000,
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: `🛑 **Last chance to enter!** 🛑`,
      threshold: 5000,
      embedColor: '#FF0000'
    }
  }
});

// ----------------------------------| Config handlers:
if(!config.users.owner) {
  console.log('\n[ERR] Configuration missing:'.bold.red)
  console.log('\n[ERR] Missing value in the variable "owner" in config.json.\n'.bold.red);
  process.exit(1);
}

if(!config.users.client_id) {
  console.log('\n[ERR] Configuration missing:'.bold.red)
  console.log('\n[ERR] Missing value in the variable "client_id" in config.json.\n'.bold.red);
  process.exit(1);
}

if(!config.guilds.guild_id) {
  console.log('\n[ERR] Configuration missing:'.bold.red)
  console.log('\n[ERR] Missing value in the variable "guild_id" in config.json.\n'.bold.red);
  process.exit(1);
}

// ----------------------------------| Crash Logger:
process.on('unhandledRejection', (reason, promis) => {
  console.log('\n[ERR] An error has been handled. :: unhandledRejection\n'.bold.red);
  console.log("[ERR] Reason: ".red + `${reason}`.underline.italic.yellow + "\n");
  console.log(promis)
  console.log("[ERR] Please check the error location above the loaded commands handler. (If possible)\n".bold.red);
  //process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('\n[ERR] An error has been handled. :: uncaughtException\n'.bold.red);
  console.log("[ERR] Error: ".red + err + "\n");
  console.log("[ERR] Please check the error location above the loaded commands handler. (If possible)\n".bold.red);
  //process.exit(1);
});

// ----------------------------------| Webhost:
const express = require('express');
const app = express();

app.get('/', (request, response) => {
  return response.sendFile('./webhost/index.html', { root: '.'});
});

app.listen(3000, () => {
  console.log('[SERVER] Server is Ready!'.bold.brightGreen);
});

// ----------------------------------| Testing Area:

// No tests found.

// ----------------------------------| Login to the bot:
client.login(process.env.TOKEN).catch(() => console.warn("[ERR] Invalid Client Token was provided, or Missing Intents.".bold.red))