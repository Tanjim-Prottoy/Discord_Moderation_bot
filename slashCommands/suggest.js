const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Share your ideas with the admins and the owner!'),
	async execute(client, interaction) {

    const modal = new Modal()
      .setCustomId('suggestion_system')
      .setTitle('Submit your Suggestion:')
      .addComponents(
    new TextInputComponent()
      .setCustomId('suggestion_system_message')
      .setLabel('Your Suggestion:')
      .setStyle('LONG')
      .setMinLength(5)
      .setMaxLength(1024)
      .setPlaceholder('Write your suggestion here...')
      .setRequired(true)
    );

    showModal(modal, {
      client: client,
      interaction: interaction
    });
    
	},
};