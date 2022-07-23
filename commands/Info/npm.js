const { MessageEmbed } = require(`discord.js`);
const config = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
    name: "npm",
    aliases: ['pkg'],
    description: "Search for NPM packages.",
    usage: "npm [package]",
    run: async (client, message, args) => {

      try {
			  const pkg = args[0];

        const embed1 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Please mention a package name.`)
          .setColor(config.messages.embeds.colors.no);
        
			  if (!pkg) return message.reply({ embeds: [embed1] });

			  const body = await fetch(`https://registry.npmjs.com/${pkg}`).then((res) => {
				  if(res.status === 404) throw "No results found.";
				  return res.json();
				});
		
			  const version = body.versions[body["dist-tags"].latest];
		
			  let deps = version.dependencies ? Object.keys(version.dependencies) : null;
			  let maintainers = body.maintainers.map((user) => user.name);
		
			  if(maintainers.length > 10) {
				  const len = maintainers.length - 10;
			  	maintainers = maintainers.slice(0, 10);
				  maintainers.push(`...${len} more.`);
			  }
		
			  if(deps && deps.length > 10) {
				  const len = deps.length - 10;
				  deps = deps.slice(0, 10);
				  deps.push(`...${len} more.`);
			  } 

        const embed2 = new MessageEmbed()
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
          .setTitle(`${pkg.toUpperCase()}'s Information!`)
          .setURL(`https://npmjs.com/package/${pkg}`)
          .addFields(
            {
              name: "• Version:",
              value: `${body["dist-tags"].latest}`,
              inline: true
            },
            {
              name: "• License:",
              value: `${body.license}`,
              inline: true
            },
            {
              name: "• Author:",
              value: `${body.author ? body.author.name : "Unknown."}`,
              inline: true
            },
            {
              name: "• Modified Since:",
              value: `${new Date(body.time.modified).toDateString()}`,
              inline: true
            },
            {
              name: "• Dependencies:",
              value: `${deps && deps.length ? deps.join(", ") : "None."}`,
              inline: true
            },
          )
          .setColor(config.messages.embeds.colors.yes);
		
			  return message.reply({ embeds: [embed2] });
        
		  } catch (e) {
        const embed3 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Invalid package.`)
          .setColor(config.messages.embeds.colors.no);
        
			  return message.reply({ embeds: [embed3] });
		  }
      
    },
};