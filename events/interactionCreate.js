const client = require("../index");

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.slashCommands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
    const ConsoleIDErrorGen = Math.floor(Math.random() * 9999999) + 1;

		console.log(`[ERROR - ${ConsoleIDErrorGen}]`, error);

    const embedErr = new MessageEmbed()
      .setTitle("Command Execution Failed.")
      .setDescription(`Unfortunality, **I can't Execute this Command!** The Error has been Logged on The Console.`)
      .addFields({ name: "Error ID:", value: `\`${ConsoleIDErrorGen}\``})
      .setColor("RED")
      .setFooter(`Please Contact the Developers to Report this Problem.`)
      .setTimestamp();

		await interaction.reply({ embeds: [embedErr], ephemeral: true });
	}
});