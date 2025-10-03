import { EmbedBuilder } from 'discord.js';
import messages from '../messages.js';
import { commands } from '../client.js';

commands['embed'] = async (interaction) => {
    try {
        const content = interaction.options.getString('content') || '';
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');

        await interaction.channel.send({
            content,
            embeds: [messages.useful.embedBuilder(title, description)]
        });

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Embed foi enviado!')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em embed:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao enviar o embed.',
            ephemeral: true
        }).catch(() => {});
    }
};