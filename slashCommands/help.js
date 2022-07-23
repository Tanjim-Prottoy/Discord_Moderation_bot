const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Soon...'),
	async execute(client, interaction) {
		return interaction.reply('Soon...');
	},
};